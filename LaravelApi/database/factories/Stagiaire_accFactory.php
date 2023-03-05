<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stagire>
 */
class Stagiaire_accFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [     
            'Fname'  => $this->faker->firstName(),
            'Lname'  => $this->faker->lastName(),
            'Domain' => $this->faker->domainName(),
            '_Number'    => $this->faker->phoneNumber(),
            'Acc_email'  => $this->faker->email(),
            'CIN' => $this->faker->creditCardNumber(),
            '_Password' => $this->faker->password()
        ];
    }
}
