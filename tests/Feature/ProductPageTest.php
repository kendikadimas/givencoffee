<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_product_index_renders_all_active_products(): void
    {
        $this->seed();

        $response = $this->get('/en/product');

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('site/product')
            ->has('products', 1));
    }

    public function test_product_show_renders_selected_product(): void
    {
        $this->seed();
        $product = Product::where('active', true)->first();

        $response = $this->get("/en/product/{$product->id}");

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('site/product/show')
            ->where('product.id', $product->id));
    }

    public function test_product_show_404_for_inactive_or_missing_product(): void
    {
        $this->seed();

        $this->get('/en/product/99999')->assertNotFound();
    }
}
