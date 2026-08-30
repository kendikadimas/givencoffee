New sample request / inquiry from {{ $inquiry->name }}

Name:              {{ $inquiry->name }}
Company/Roastery:  {{ $inquiry->company }}
Email:             {{ $inquiry->email }}
Phone/WhatsApp:    {{ $inquiry->phone }}
Destination:       {{ $inquiry->country }}
Annual Demand:     {{ $inquiry->annual_demand }}
Shipping Address:  {{ $inquiry->shipping_address }}

{{ $inquiry->message }}

View in admin: {{ url('/admin/inquiries') }}
