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
            $table->decimal('amount', 18, 4);
            $table->char('currency', 3);
            $table->timestampsTz();

            $table->primary('id');
            $table->unique(['stash_id', 'currency']);
            $table->foreign('stash_id')->references('id')->on('stashes')->delete('restrict')->update('cascade');
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
