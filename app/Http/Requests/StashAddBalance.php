<?php

namespace App\Http\Requests;

use App\Rules\StashType;
use App\Rules\SupportedCurrency;
use App\Stash;
use Illuminate\Foundation\Http\FormRequest;

class StashAddBalance extends FormRequest
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
            'currency' => ['required','string', new SupportedCurrency],
            'amount' => 'required|numeric|max:999999999999999.999999|min:0',
        ];
    }
}
