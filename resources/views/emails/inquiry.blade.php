New wholesale inquiry from {{ $inquiry->name }}

Name:    {{ $inquiry->name }}
Company: {{ $inquiry->company }}
Email:   {{ $inquiry->email }}
Country: {{ $inquiry->country }}
Quantity:{{ $inquiry->quantity }}

Message:
{{ $inquiry->message }}

View in admin: {{ url('/admin/inquiries') }}
