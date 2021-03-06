<?php

return [
    'form' => [
        'new_title' => 'New Stash',
        'edit_title' => 'Editing Stash {{label}}',
        'loading' => 'Loading stash properties',
        'loading_types' => 'Loading stash types',
        'text' => [
            'label' => 'Give your stash a descriptive name so you can tell what it represents at a glance. Suggestions: Wallet, Checking Account, Savings Account. May not be longer than {{max}} characters.',
            'type' => 'Choose what kind of stash this is. Later on some new options may be available for different stash types, such as transfer fees for bank accounts. This cannot be changed once the stash is created.'
        ],
        'avail_types' => 'Available types',
        'confirm_delete' => [
          'title' => 'Deleting Stash {{label}}',
          'body' => 'Are you sure you want to delete the stash {{label}} and all associated balances?',
        ]
    ],
    'balance_form' => [
        'title' => 'Manage Balances for {{label}}',
        'avail_currencies' => 'Available currencies',
        'add_title' => 'Add New Balance',
        'delete_modal' => [
            'title' => 'Delete {{currency}} Balance',
            'body' => 'Are you sure you want to delete this {{currency}} balance of {{amount}}?',
        ],
    ],
    'types' => [
        'cash' => 'Cash',
        'bank_account' => 'Bank Account'
    ]
];
