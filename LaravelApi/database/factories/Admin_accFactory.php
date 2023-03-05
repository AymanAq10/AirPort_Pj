<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class Admin_accFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'Fname'=> $this->faker->lastName(),
            'Lname'=> $this->faker->name(),
            'Email'=> $this->faker->companyEmail(),
            'Tele'=> $this->faker->phoneNumber(),
            'password' => $this->faker->password(),
        ];
    }
}
