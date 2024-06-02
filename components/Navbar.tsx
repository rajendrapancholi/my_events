'use client';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { BuiltInProviderType, ProviderType } from 'next-auth/providers';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProvider] = useState<ProviderType[] | null>(null);
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProvider(res);
    })();
  }, []);

  const myP = async () => {
    const p = await getProviders();
    console.log(p);
    return p;
  };
  const user = {
    email: 'email@mail.com',
    name: 'Rajendra pancholi',
    password: 'user',
    image: '/assets/users/user1',
    isAdmin: false,
  };
  return (
    <div>
      <h1>Login</h1>
      <button
        type="button"
        onClick={() => signIn(user as any)}
        className="btn btn-ghost"
      >
        Provider
      </button>
      <div className="h-full w-1/3 gap-2 border border-cyan-500 rounded-md flex flex-col">
        <p className="text-lg font-bold mx-auto text-amber-500">Sign In with</p>
        {providers &&
          Object.values(providers).map((provider: any) => (
            <button
              type="button"
              key={provider.name}
              onClick={() => {
                // signIn(user as any);
                signIn(provider.id);
              }}
              className="btn btn-primary btn-sm p-1 mx-2"
            >
              {provider.name}
            </button>
          ))}
      </div>
      <div className="bg-cyan-400 h-1/3 w-1/3">
        {session?.user && (
          <div>
            <Link href="/profile">
              <Image
                src={session?.user.image as string}
                width={24}
                height={24}
                alt={session?.user.name as string}
              />
            </Link>
            <h1>{session?.user as string}</h1>
            <div>
              <button type="button" onClick={() => signOut}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
