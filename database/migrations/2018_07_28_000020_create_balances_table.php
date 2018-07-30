<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBalancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('balances', function (Blueprint $table) {
            $table->uuid('id');
            $table->uuid('stash_id');
            $table->decimal('value', 18, 4);
            $table->char('currency_id', 3);
            $table->timestamps();

            $table->primary('id');
            $table->foreign('stash_id')->references('id')->on('stashes')->delete('restrict')->update('cascade');
            $table->foreign('currency_id')->references('id')->on('currencies')->delete('restrict')->update('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('balances');
    }
}
