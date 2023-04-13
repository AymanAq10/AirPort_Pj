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
            'Fname'  => substr($this->faker->firstName(),0,10),
            'Lname'  => substr($this->faker->lastName(),0,10),
            'Domain' => substr($this->faker->domainName(),0,10),
            '_Number'    => substr($this->faker->phoneNumber(),0,13),
            'Acc_email'  => substr($this->faker->email(),0,30),
            'CIN' => substr($this->faker->creditCardNumber(),0,8),
            '_Password' => substr($this->faker->password(),0,20),
            'ImageProfile' => $this->faker->image()
        ];
    }
}
