@extends('admin.layout')

@section('title', $post ? 'Edit post' : 'New post')

@push('styles')
    <!-- Quill.js CDN stylesheet -->
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
    <style>
        .ql-toolbar.ql-snow {
            border-color: var(--color-border, #e5e7eb) !important;
            border-top-left-radius: 0.375rem;
            border-top-right-radius: 0.375rem;
            background-color: var(--color-bone, #f4efe5);
        }
        .ql-container.ql-snow {
            border-color: var(--color-border, #e5e7eb) !important;
            border-bottom-left-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
            background-color: var(--color-bone, #f4efe5);
            font-family: inherit;
            font-size: 0.875rem;
            min-h: 280px;
        }
        .ql-editor {
            min-height: 280px;
            color: var(--color-ink, #221a12);
        }
        .ql-editor.ql-blank::before {
            color: var(--color-coffee, #7a644c);
            font-style: normal;
            opacity: 0.6;
        }
        .ql-snow .ql-stroke {
            stroke: var(--color-ink, #221a12) !important;
        }
        .ql-snow .ql-fill {
            fill: var(--color-ink, #221a12) !important;
        }
        .ql-snow .ql-picker {
            color: var(--color-ink, #221a12) !important;
        }
    </style>
@endpush

@section('content')
    @php
        $defaults = $post ? [
            'slug' => $post->slug,
            'title_en' => $post->title['en'] ?? '',
            'title_id' => $post->title['id'] ?? '',
            'excerpt_en' => $post->excerpt['en'] ?? '',
            'excerpt_id' => $post->excerpt['id'] ?? '',
            'content_en' => \App\Support\ContentParser::toText($post->getLocalizedContent('en')),
            'content_id' => \App\Support\ContentParser::toText($post->getLocalizedContent('id')),
            'category_id' => $post->category_id,
            'cover_image' => $post->cover_image,
            'featured' => $post->featured,
            'published' => (bool) $post->published_at,
        ] : [
            'slug' => '', 'title_en' => '', 'title_id' => '', 'excerpt_en' => '', 'excerpt_id' => '',
            'content_en' => '', 'content_id' => '', 'category_id' => '', 'cover_image' => '',
            'featured' => false, 'published' => false,
        ];
        $action = $post ? route('admin.posts.update', $post) : route('admin.posts.store');
        $method = $post ? 'PUT' : 'POST';
    @endphp

    <div class="grid gap-8 lg:grid-cols-12">
        <!-- Form Left Column -->
        <div class="lg:col-span-8">
            <form id="post-form" method="POST" action="{{ $action }}" enctype="multipart/form-data" class="space-y-6">
                @csrf
                @method($method)

                <div class="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink">Title (EN) <span class="text-terra">*</span></label>
                        <input name="title_en" value="{{ old('title_en', $defaults['title_en']) }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                        @error('title_en')<p class="mt-1 text-xs text-terra-deep">{{ $message }}</p>@enderror
                    </div>
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink">Judul (ID) <span class="text-terra">*</span></label>
                        <input name="title_id" value="{{ old('title_id', $defaults['title_id']) }}" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                        @error('title_id')<p class="mt-1 text-xs text-terra-deep">{{ $message }}</p>@enderror
                    </div>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink">Slug</label>
                        <input name="slug" value="{{ old('slug', $defaults['slug']) }}" placeholder="auto-generated from title" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                    </div>
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink">Category</label>
                        <select name="category_id" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                            <option value="">— none —</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}" @selected((string) $defaults['category_id'] === (string) $category->id)>{{ $category->name['en'] }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Cover image</label>
                    <input type="file" name="cover_image" accept="image/*" class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30">
                    <p class="mt-1 text-xs text-coffee">Current: {{ $defaults['cover_image'] ?: '—' }}</p>
                </div>

                <div class="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink">Excerpt (EN) <span class="text-terra">*</span></label>
                        <textarea name="excerpt_en" rows="3" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30" placeholder="Short summary for post cards and search engine preview">{{ old('excerpt_en', $defaults['excerpt_en']) }}</textarea>
                    </div>
                    <div>
                        <label class="mb-2 block text-sm font-medium text-ink">Excerpt (ID) <span class="text-terra">*</span></label>
                        <textarea name="excerpt_id" rows="3" required class="w-full rounded-md border border-input bg-bone px-4 py-2.5 text-sm outline-none focus:border-terra focus:ring-2 focus:ring-terra/30" placeholder="Ringkasan singkat untuk kartu artikel dan pratinjau mesin pencari">{{ old('excerpt_id', $defaults['excerpt_id']) }}</textarea>
                    </div>
                </div>

                <!-- Rich Text Editors -->
                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Content (EN) <span class="text-terra">*</span></label>
                    <input type="hidden" name="content_en" id="content_en_input">
                    <div id="editor_en"></div>
                </div>

                <div>
                    <label class="mb-2 block text-sm font-medium text-ink">Content (ID) <span class="text-terra">*</span></label>
                    <input type="hidden" name="content_id" id="content_id_input">
                    <div id="editor_id"></div>
                </div>

                <div class="flex items-center gap-6 pt-2">
                    <label class="flex items-center gap-2 text-sm text-ink cursor-pointer">
                        <input type="checkbox" name="featured" value="1" @checked($defaults['featured']) class="size-4 accent-terra"> Featured
                    </label>
                    <label class="flex items-center gap-2 text-sm text-ink cursor-pointer">
                        <input type="checkbox" name="published" value="1" @checked($defaults['published']) class="size-4 accent-terra"> Published
                    </label>
                </div>

                <div class="flex items-center gap-3 pt-2">
                    <button type="submit" class="inline-flex h-11 items-center rounded-full bg-terra px-7 text-sm font-semibold text-cream transition-colors hover:bg-terra-deep">Save post</button>
                    <a href="{{ route('admin.posts.index') }}" class="text-sm text-coffee hover:text-ink">Cancel</a>
                </div>
            </form>
        </div>

        <!-- Sidebar Guide Column -->
        <div class="lg:col-span-4">
            <div class="sticky top-6 rounded-md border border-border/80 bg-cream p-6 shadow-sm space-y-6">
                <div>
                    <div class="flex items-center gap-2 text-terra mb-2">
                        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 class="font-display text-lg font-bold text-ink">Panduan Input Artikel</h3>
                    </div>
                    <p class="text-xs leading-relaxed text-coffee">
                        Petunjuk pengisian dan format teks agar artikel tampil optimal di halaman jurnal/blog Given Coffee.
                    </p>
                </div>

                <hr class="border-border/60">

                <div class="space-y-4 text-xs leading-relaxed text-coffee">
                    <div>
                        <h4 class="font-semibold uppercase tracking-wider text-ink text-[11px] mb-1">1. Format Judul (Heading)</h4>
                        <p>Gunakan toolbar editor <strong>Header 2 (H2)</strong> untuk membuat sub-judul bagian. Sub-judul akan otomatis dirender dengan gaya Playfair khas Given Coffee di halaman publik.</p>
                    </div>

                    <div>
                        <h4 class="font-semibold uppercase tracking-wider text-ink text-[11px] mb-1">2. Paragraf & Teks Tebal</h4>
                        <p>Ketik teks paragraf secara alami. Setiap paragraf baru dipisahkan dengan Enter. Gunakan tombol <strong>Bold (B)</strong> atau <em>Italic (I)</em> untuk memberi penekanan pada istilah penting.</p>
                    </div>

                    <div>
                        <h4 class="font-semibold uppercase tracking-wider text-ink text-[11px] mb-1">3. Ringkasan (Excerpt)</h4>
                        <p>Isi Excerpt (EN & ID) dengan 1–2 kalimat singkat (maks 250 karakter). Teks ini muncul di kartu artikel halaman utama Blog & meta deskripsi SEO.</p>
                    </div>

                    <div>
                        <h4 class="font-semibold uppercase tracking-wider text-ink text-[11px] mb-1">4. Konten Dua Bahasa</h4>
                        <p>Wajib mengisi versi <strong>EN (Inggris)</strong> dan <strong>ID (Indonesia)</strong> agar pengunjung dapat berganti bahasa dengan mulus.</p>
                    </div>

                    <div>
                        <h4 class="font-semibold uppercase tracking-wider text-ink text-[11px] mb-1">5. Gambar Sampul (Cover)</h4>
                        <p>Unggah gambar resolusi tinggi (landscape/orientasi mendatar, misal 16:9 atau 16:10, format JPG/PNG/WebP, maks 5MB) untuk hasil visual terbaik.</p>
                    </div>
                </div>

                <div class="rounded-md border border-terra/20 bg-terra/5 p-4 text-xs text-ink">
                    <p class="font-semibold text-terra mb-1">Tips Publikasi:</p>
                    <p class="text-coffee leading-relaxed">
                        Centang <strong>Published</strong> agar artikel langsung tampil di website. Centang <strong>Featured</strong> untuk menjadikannya artikel utama berukuran besar di bagian atas halaman Jurnal.
                    </p>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <!-- Quill.js CDN script -->
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const rawContentEn = {!! json_encode(old('content_en', $defaults['content_en'])) !!};
            const rawContentId = {!! json_encode(old('content_id', $defaults['content_id'])) !!};

            const toolbarOptions = [
                [{ 'header': [2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['clean']
            ];

            const editorEn = new Quill('#editor_en', {
                theme: 'snow',
                placeholder: 'Tulis konten dalam bahasa Inggris...',
                modules: { toolbar: toolbarOptions }
            });

            const editorId = new Quill('#editor_id', {
                theme: 'snow',
                placeholder: 'Tulis konten dalam bahasa Indonesia...',
                modules: { toolbar: toolbarOptions }
            });

            // Convert plain Markdown-ish text to HTML for Quill initialization
            function textToHtml(text) {
                if (!text) return '';
                const lines = text.split(/\r?\n/);
                let html = '';
                lines.forEach(function (line) {
                    line = line.trim();
                    if (!line) return;
                    if (line.startsWith('## ')) {
                        html += '<h2>' + line.substring(3) + '</h2>';
                    } else if (line.startsWith('### ')) {
                        html += '<h3>' + line.substring(4) + '</h3>';
                    } else {
                        html += '<p>' + line + '</p>';
                    }
                });
                return html;
            }

            // Populate Quill editors
            if (rawContentEn) {
                editorEn.clipboard.dangerouslyPasteHTML(textToHtml(rawContentEn));
            }
            if (rawContentId) {
                editorId.clipboard.dangerouslyPasteHTML(textToHtml(rawContentId));
            }

            // Synchronize Quill HTML back into Markdown-like syntax or plain text blocks before form submit
            const form = document.getElementById('post-form');
            form.addEventListener('submit', function () {
                function htmlToText(editor) {
                    const delta = editor.getContents();
                    let resultLines = [];
                    
                    // Walk through root children or editor HTML directly
                    const rootNode = editor.root;
                    Array.from(rootNode.children).forEach(function (node) {
                        const tag = node.tagName ? node.tagName.toLowerCase() : '';
                        const text = node.innerText ? node.innerText.trim() : node.textContent.trim();
                        if (!text) return;

                        if (tag === 'h2') {
                            resultLines.push('## ' + text);
                        } else if (tag === 'h3') {
                            resultLines.push('## ' + text);
                        } else {
                            resultLines.push(text);
                        }
                    });

                    return resultLines.join("\n\n");
                }

                document.getElementById('content_en_input').value = htmlToText(editorEn);
                document.getElementById('content_id_input').value = htmlToText(editorId);
            });
        });
    </script>
@endpush
