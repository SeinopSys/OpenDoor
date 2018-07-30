<?php

namespace App\Http\Requests;

use App\Rules\StrictEmail;
use App\Rules\Username;
use Illuminate\Foundation\Http\FormRequest;
use Valorin\Pwned\Pwned;

class Registration extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return env('REGISTRATION_ENABLED', false);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'unique:users', new Username],
            'email' => ['required', 'unique:users', new StrictEmail],
            'password' => [
                'required',
                'confirmed',
                'string',
                'min:6',
                'max:300',
                'case_diff',
                'numbers',
                'letters',
                new Pwned,
            ],
        ];
    }
}
