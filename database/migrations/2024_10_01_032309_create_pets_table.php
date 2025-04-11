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
        Schema::create('pets', function (Blueprint $table) {
            $table->string('id', 6)->primary();
            $table->string('client', 6)->nullable();
            $table->string('name');
            $table->unsignedBigInteger('type')->nullable();
            $table->unsignedBigInteger('breed')->nullable();
            $table->string('gender');
            $table->string('status')->default('active');
            $table->date('dob')->nullable();
            $table->longText('picture')->default("defaultPetPic.jpg");
            $table->string("label")->nullable();
            $table->timestamps();

            $table->foreign('client')
            ->references('id')
            ->on('user_clients')
            ->nullOnDelete()
            ->cascadeOnUpdate();
            
            $table->foreign('type')
            ->references('id')
            ->on('pet_types')
            ->nullOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('breed')
            ->references('id')
            ->on('pet_breeds')
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
