<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:create
                            {email : Email address for the new admin}
                            {--name= : Display name (defaults to email prefix)}
                            {--password= : Password (will prompt if not provided)}';

    protected $description = 'Create a new admin user';

    public function handle(): int
    {
        $email = $this->argument('email');

        if (User::where('email', $email)->exists()) {
            $this->error("A user with email [{$email}] already exists.");

            return self::FAILURE;
        }

        $name = $this->option('name') ?: str($email)->before('@')->title()->toString();

        $password = $this->option('password')
            ?: $this->secret('Password (leave blank to auto-generate)');

        if (! $password) {
            $password = str()->random(16);
            $this->line("Generated password: <comment>{$password}</comment>");
        }

        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);

        $this->info("Admin user [{$email}] created successfully.");

        return self::SUCCESS;
    }
}
