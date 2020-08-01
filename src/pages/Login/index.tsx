import React, { useCallback, useRef } from 'react';
import { Button, Input } from '../../components';
import { Container } from './styles';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().min(3, 'Mínimo 3 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/');
      } catch (err) {
        console.log(err);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [signIn, history]
  );

  return (
    <Container>
      <h2>
        Seja bem vindo!
        <br />
        Faça seu login abaixo:
      </h2>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h4>Insira seus dados nos campos:</h4>
        <Input name="email" placeholder="Insira seu e-mail aqui " data-testid="email" />

        <Input
          data-testid="password"
          name="password"
          type="password"
          placeholder="Insira sua senha aqui"
        />

        <Button data-testid="login">login</Button>
      </Form>
    </Container>
  );
};

export default Login;
