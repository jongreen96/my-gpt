import LoginButton from '@/components/loginButton';

import github from '@/../public/github-logo.svg';
import google from '@/../public/google-logo.svg';

const providers = [
  {
    name: 'Google',
    id: 'google',
    icon: google,
  },
  {
    name: 'GitHub',
    id: 'github',
    icon: github,
  },
];

export function LoginProviders() {
  return (
    <section className='flex gap-2'>
      {providers.map((provider) => (
        <div key={provider.id}>
          <LoginButton provider={provider} />
        </div>
      ))}
    </section>
  );
}
