<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StashResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'type' => $this->type,
            'balances' => $this->balances()->get(),
        ];
    }
}
