<?php

namespace App\Providers;

use App\Contracts\IGenerateFilenameService;
use App\Contracts\IGenerateIdService;
use App\Contracts\IGenerateOTPService;
use App\Contracts\ISendEmailService;
use App\Contracts\ISMSService;
use App\Contracts\IUpdateSentimentStatisticsTableService;
use App\Services\GenerateFilenameService;
use App\Services\GenerateIdService;
use App\Services\GenerateOTPService;
use App\Services\SendEmailService;
use App\Services\SMSService;
use App\Services\UpdateSentimentStatisticsTableService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(IGenerateIdService::class, GenerateIdService::class);
        $this->app->bind(IGenerateFilenameService::class, GenerateFilenameService::class);
        $this->app->bind(ISMSService::class, SMSService::class);
        $this->app->bind(IGenerateOTPService::class, GenerateOTPService::class);
        $this->app->bind(ISendEmailService::class, SendEmailService::class);
        $this->app->bind(IUpdateSentimentStatisticsTableService::class, UpdateSentimentStatisticsTableService::class);
    }
}
