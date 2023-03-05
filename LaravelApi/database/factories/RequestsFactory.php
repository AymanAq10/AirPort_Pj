<?php

namespace Database\Factories;

use App\Models\Stagiaire_acc;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Requeste>
 */
class RequestsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [   
            'Acc_id' => Stagiaire_acc::factory(),
            'StagiaireCV' => $this->faker->filePath('C:\Users\brahim azirar\Desktop\!!!!!!!\59233230.pdf'),
            'Message' => $this->faker->sentence($maxNbChars=50),
            'RequDate' => $this->faker->date()
        ];
    }
}
