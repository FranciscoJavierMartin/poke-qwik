import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

import styles from './login.css?inline';

export const useLoginUserAction = routeAction$(
  (data, { cookie }) => {
    console.log(data);

    cookie.set('jwt', 'my-jwt', { secure: true, path: '/' });

    return {
      success: true,
      jwt: 'my-jwt',
    };
  },
  zod$({
    email: z.string().email(),
    password: z.string().min(6),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form class='login-form mt-5' action={action}>
      <div class='relative'>
        <input name='email' type='text' placeholder='Email address' />
        <label for='email'>Email Address</label>
      </div>
      <div class='relative'>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
        />
        <label for='password'>Password</label>
      </div>
      <div class='relative'>
        <button type='submit'>Login</button>
      </div>

      {/* <code>{JSON.stringify(formState, undefined, 2)}</code> */}
    </Form>
  );
});
