<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStashesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stashes', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('user_id');
            $table->string('label', 140);
            $table->string('type', 32)->nullable();
            $table->timestampsTz();

            $table->primary('id');
            $table->foreign('user_id')->references('id')->on('users')->delete('cascade')->update('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stashes');
    }
}
