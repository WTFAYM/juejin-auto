import jwt from 'jsonwebtoken'

export function getXGameId(id: number | string) {
    const time = +new Date().getTime();
    return jwt.sign(
        {
            gameId: id,
            time: time,
            // eslint-disable-next-line max-len
        },
        "-----BEGIN EC PARAMETERS-----\nBggqhkjOPQMBBw==\n-----END EC PARAMETERS-----\n-----BEGIN EC PRIVATE KEY-----\nMHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49\nAwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU\nnYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==\n-----END EC PRIVATE KEY-----\n",
        {
            algorithm: "ES256",
            expiresIn: 2592e3,
            header: {
                alg: "ES256",
                typ: "JWT",
            },
        }
    );
}