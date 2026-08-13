<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Inquiry;
use App\Models\Post;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create([
            'email_verified_at' => now(),
            'is_admin' => true,
        ]);

        $this->seed();
    }

    public function test_non_admin_is_forbidden(): void
    {
        $user = User::factory()->create(['email_verified_at' => now()]);

        $this->actingAs($user)->get('/admin')->assertForbidden();
    }

    public function test_admin_pages_render(): void
    {
        $this->actingAs($this->admin);

        foreach (['/admin', '/admin/posts', '/admin/posts/create', '/admin/categories', '/admin/product', '/admin/settings', '/admin/inquiries'] as $url) {
            $this->get($url)->assertOk();
        }
    }

    public function test_admin_can_create_post(): void
    {
        $this->actingAs($this->admin);

        $this->post('/admin/posts', [
            'title_en' => 'Hello EN',
            'title_id' => 'Halo ID',
            'excerpt_en' => 'Excerpt EN',
            'excerpt_id' => 'Excerpt ID',
            'content_en' => "Para one\n## Heading\nPara two",
            'content_id' => "Paragraf satu\n## Judul\nParagraf dua",
            'published' => '1',
        ])->assertRedirect(route('admin.posts.index'));

        $post = Post::where('slug', 'hello-en')->first();

        $this->assertNotNull($post);
        $this->assertCount(3, $post->content['en']);
        $this->assertSame('h2', $post->content['en'][1]['type']);
        $this->assertNotNull($post->published_at);
    }

    public function test_admin_can_update_product(): void
    {
        $this->actingAs($this->admin);

        $product = Product::first();

        $this->put("/admin/product/{$product->id}", [
            'name_en' => 'Java Highland',
            'name_id' => 'Java Highland',
            'subtitle_en' => 'Single-origin washed Arabica',
            'subtitle_id' => 'Arabika washed single-origin',
            'story_en' => 'Story EN',
            'story_id' => 'Story ID',
            'notes_en' => 'Notes EN',
            'notes_id' => 'Notes ID',
            'traits_en' => 'Chocolate, Nuts',
            'traits_id' => 'Cokelat, Kacang',
            'specs_en' => "Origin: West Java\nAltitude: 1400 masl",
            'specs_id' => "Asal: Jawa Barat\nKetinggian: 1400 mdpl",
            'active' => '1',
        ])->assertRedirect(route('admin.product.edit'));

        $product->refresh();

        $this->assertSame('Story EN', $product->story[0]['en']);
        $this->assertCount(2, $product->specs);
        $this->assertSame(['en' => 'Origin', 'id' => 'Asal'], $product->specs[0]['label']);
    }

    public function test_admin_can_update_inquiry_status(): void
    {
        $this->actingAs($this->admin);

        $inquiry = Inquiry::create([
            'name' => 'Buyer',
            'email' => 'buyer@example.com',
            'message' => 'Hi',
            'status' => Inquiry::STATUS_NEW,
        ]);

        $this->put("/admin/inquiries/{$inquiry->id}", ['status' => 'replied'])->assertRedirect();

        $this->assertSame('replied', $inquiry->fresh()->status);
    }
}
