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
        Schema::table('appointments', function (Blueprint $table) {
            $table->string('pet', 6)->nullable()->change();
            $table->foreign('pet')
            ->references('id')
            ->on('pets')
            ->nullOnDelete()
            ->cascadeOnUpdate();
        });
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        //
    }
};
