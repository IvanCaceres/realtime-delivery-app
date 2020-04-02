<?php

namespace App\Http\Controllers\Auth;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Passport;
use Laravel\Passport\TokenRepository;
use Lcobucci\JWT\Parser as JwtParser;
use League\OAuth2\Server\AuthorizationServer;
use Psr\Http\Message\ServerRequestInterface;

class PassportAuthController extends AccessTokenController
{
    public function __construct(AuthorizationServer $server,
                                TokenRepository $tokens,
                                JwtParser $jwt)
    {
        parent::__construct($server, $tokens, $jwt);
    }

    public function login(ServerRequestInterface $request)
    {   
        $parsedBody = $request->getParsedBody();

        $client = $this->getClient($parsedBody['client_name']);

        $parsedBody['username'] = $parsedBody['email'];
        $parsedBody['grant_type'] = 'password';
        $parsedBody['client_id'] = $client->id;
        $parsedBody['client_secret'] = $client->secret;

        // since it is not required by passport
        unset($parsedBody['email'], $parsedBody['client_name']);

        return parent::issueToken($request->withParsedBody($parsedBody));
    }

    private function getClient(string $name)
    {
        return Passport::client()
            ->where([
                ['name', $name],
                ['password_client', 1],
                ['revoked', 0]
            ])
            ->first();
    }

    public function logout(ServerRequestInterface $request)
    {
        $parsedBody = $request->getParsedBody();

        $client = $this->getClient('Laravel Password Grant Client');

        $token = auth()->user()
            ->tokens
            ->where('client_id', $client->id)
            ->first();

        abort_if(is_null($token), 400, 'Token for the given client name does not exist');

        $token->delete();

        return response()->json('Logged out successfully', 200);
    }
}