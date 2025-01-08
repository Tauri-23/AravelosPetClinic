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
        Schema::create('sentiment_analyses', function (Blueprint $table) {
            $table->id();
            $table->string('aspect');

            $table->float('positive_percent');
            $table->float('neutral_percent');
            $table->float('negative_percent');

            $table->integer('positive_count');
            $table->integer('neutral_count');
            $table->integer('negative_count');

            $table->longText('positive_comments');
            $table->longText('neutral_comments');
            $table->longText('negative_comments');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sentiment_analyses');
    }
};
