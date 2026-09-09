<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\SitemapController;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/en');

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/robots.txt', fn () => response("User-agent: *\nAllow: /\nSitemap: ".url('/sitemap.xml'))->header('Content-Type', 'text/plain'));

Route::get('/uploads/{path}', function (string $path) {
    $candidates = [
        public_path('uploads/'.$path),
        base_path('../public_html/uploads/'.$path),
    ];

    foreach ($candidates as $file) {
        if (file_exists($file) && is_file($file)) {
            return response()->file($file);
        }
    }

    abort(404);
})->where('path', '.*');

Route::prefix('{locale}')
    ->whereIn('locale', ['en', 'id'])
    ->group(function () {
        Route::get('/', [SiteController::class, 'home'])->name('home');
        Route::get('/about', [SiteController::class, 'about'])->name('about');
        Route::get('/product', [SiteController::class, 'product'])->name('product');
        Route::get('/product/{product}', [SiteController::class, 'productShow'])->name('product.show');
        Route::get('/process', [SiteController::class, 'process'])->name('process');
        Route::get('/export', [SiteController::class, 'export'])->name('export');
        Route::get('/contact', [SiteController::class, 'contact'])->name('contact');
        Route::post('/contact/inquiry', [InquiryController::class, 'store'])
            ->name('contact.store')
            ->middleware('throttle:5,1');
        Route::get('/blog', [SiteController::class, 'blogIndex'])->name('blog.index');
        Route::get('/blog/{post}', [SiteController::class, 'blogShow'])->name('blog.show');
    });

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn (): RedirectResponse => redirect(request()->user()?->is_admin ? '/admin' : '/en'))->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('/faqs', [FaqController::class, 'index'])->name('faqs.index');
    Route::post('/faqs', [FaqController::class, 'store'])->name('faqs.store');
    Route::put('/faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update');
    Route::delete('/faqs/{faq}', [FaqController::class, 'destroy'])->name('faqs.destroy');

    Route::get('/testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');

    Route::get('/product', [ProductController::class, 'edit'])->name('product.edit');
    Route::put('/product/{product}', [ProductController::class, 'update'])->name('product.update');

    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');

    Route::get('/inquiries', [App\Http\Controllers\Admin\InquiryController::class, 'index'])->name('inquiries.index');
    Route::get('/inquiries/export', [App\Http\Controllers\Admin\InquiryController::class, 'export'])->name('inquiries.export');
    Route::get('/inquiries/{inquiry}', [App\Http\Controllers\Admin\InquiryController::class, 'show'])->name('inquiries.show');
    Route::put('/inquiries/{inquiry}', [App\Http\Controllers\Admin\InquiryController::class, 'update'])->name('inquiries.update');
    Route::delete('/inquiries/{inquiry}', [App\Http\Controllers\Admin\InquiryController::class, 'destroy'])->name('inquiries.destroy');
});

require __DIR__.'/settings.php';
