import { Flex, Button, Stack} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/Form/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignInFormData = {
  email: string;
  password: string;
}
 
export default function SignIn() {
  const signInFormSchema = yup.object().shape({
    email: yup.string().email().required('E-mail obrigatório'),
    password: yup.string().required(),
  })

  const { register, handleSubmit, formState: { errors }} = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  });


  const handleSignIn: SubmitHandler<SignInFormData> = async(values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Valores: ", values);
  }
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form" width="100%" maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input name="email" error={errors.email } type="email" label="E-mail" {...register("email")}/>
          <Input name="password" type="password" error={errors.password} label="Senha" {...register("password")}/>
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" >Entrar</Button>
      </Flex>
    </Flex>
  )
}
