<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

/**
 * Make sure usernames
 *  - are all lowercase
 *  - start with a letter, followed by numbers and/or dashes
 *  - are between 3 and 25 chars long
 * @package App\Rules
 */
class Username extends BaseRule
{

    /**
     * Determine if the validation rule passes.
     *
     * @param  string $attribute
     * @param  mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return \is_string($value) && preg_match('/^[a-z][a-z\d\.]{2,24}$/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.requirements');
    }
}
