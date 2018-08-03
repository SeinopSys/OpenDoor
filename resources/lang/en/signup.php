<?php

return [
    'specs' => [
        'name' => 'All lowercase, must start with a letter followed by letters and numbers. Must be between {{min}} and {{max}} characters long. Choose wisely, as you cannot change this later.',
        'email' => "Enter a valid e-mail address, no throwaway domains. This is only needed for login and password recovery, we won't bombard you with spam.",
        'password' => 'At least {{min}} characters long, contains one upper and lower case letter and a number. Passwords that have been compromised in public data breaches cannot be used.'
    ],
    'error' => [
        'password_mismatch' => 'The two passwords do not match.'
    ],
    'sign_up' => 'Sign up',
    'signing_up' => 'Signing up',
    'log_in_pls' => [
        'If you already have an account you should ',
        '.'
    ],
    'log_in_link' => 'log in'
];
