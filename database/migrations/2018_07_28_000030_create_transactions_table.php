<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('user_id');
            $table->uuid('balance_id');
            $table->decimal('value', 18, 4);
            $table->timestampsTz();

            $table->primary('id');
            $table->foreign('user_id')->references('id')->on('users')->delete('cascade')->update('cascade');
            $table->foreign('balance_id')->references('id')->on('stashes')->delete('cascade')->update('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
