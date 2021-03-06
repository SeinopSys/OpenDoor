<?php

namespace App\Http\Requests;

use App\Rules\StashType;
use App\Stash;
use Illuminate\Foundation\Http\FormRequest;

class StashStore extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'label' => 'required|string|max:'.Stash::LABEL_MAX_LENGTH,
            'type' => ['required', 'string', new StashType],
        ];
    }
}
