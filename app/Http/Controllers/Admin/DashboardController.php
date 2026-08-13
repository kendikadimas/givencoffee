<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Inquiry;
use App\Models\Post;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard', [
            'postCount' => Post::count(),
            'categoryCount' => Category::count(),
            'inquiryCount' => Inquiry::count(),
            'newInquiryCount' => Inquiry::where('status', Inquiry::STATUS_NEW)->count(),
            'productCount' => Product::count(),
            'recentInquiries' => Inquiry::latest()->limit(5)->get(),
            'recentPosts' => Post::latest()->limit(5)->get(),
        ]);
    }
}
