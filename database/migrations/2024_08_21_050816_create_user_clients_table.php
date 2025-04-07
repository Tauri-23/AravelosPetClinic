<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_clients', function (Blueprint $table) {
            $table->string('id', 6)->primary();
            $table->string('fname');
            $table->string('mname')->nullable();
            $table->string('lname');
            $table->string('email')->unique();
            $table->string('password')->unique();
            $table->date('bday')->nullable();
            $table->string('gender')->nullable();
            $table->string('address')->nullable();
            $table->string('phone');
            $table->longtext('picture')->nullable();
            $table->boolean("email_verified")->default(false);
            $table->boolean('phone_verified')->default(false);
            $table->string('status')->default('active');
            $table->string("label")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_clients');
    }
};
