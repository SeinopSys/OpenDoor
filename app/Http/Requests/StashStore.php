<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StashStore extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'label' => 'required|max:64'
        ];
    }
}
