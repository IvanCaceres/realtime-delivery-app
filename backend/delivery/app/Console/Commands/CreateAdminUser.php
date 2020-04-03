<?php

namespace App\Console\Commands;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Console\Command;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a user with admin access.';


    private $password;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }
    public function passwordPrompts() {
        $password = $this->secret('Enter an admin password (minimum 8 characters)');
        $confirm_password = $this->secret('Confirm admin password');
        $passCount = mb_strlen($password);
        if (!$password || $passCount < 8) {
            $this->error('Password length is too short.');
            return false;
        }

        if ($password === $confirm_password) {
            $this->password = $password;
            return true;
        } else {
            $this->error("Passwords did not match.");
            return false;
        }
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if(!$this->passwordPrompts()) {
            $this->error("Aborting!");
            return;
        }

        $user = new User;
        $user->username = 'admin';
        $user->email = 'admin@admin';
        $user->password = Hash::make($this->password);
        $user->admin = true;
        $user->phone = '2122222222';
        $user->save();

        $this->info('Admin user created. Login username is admin.');
    }
}
