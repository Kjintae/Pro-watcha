import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import SignForm from '../../component/Sign/SignForm';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) =>({
      form: auth.register,
      auth: auth.auth,
      authError: auth.authError,

    }))

    //인풋 변경 이벤트 핸들러
    const onChange= e => {
      const { value, name } = e.target;
      dispatch(
        changeField({
          form: 'register',
          key: name,
          value
        })
      );
    };

    // 폼 등록 이벤트 핸들러
    const onSubmit = e => {
      e.preventDefault();
      const { email, password, passwrodConfirm } = form;
      if (password !== passwrodConfirm ) {
        // TODO: 오류처리
        return ;
      }
      dispatch(register({ email, password }));
    };

    // 컴포넌트가 처음 랜터링 될 때 form을 초기화함.
    useEffect(() => {
      dispatch(initializeForm('register'));
    }, [dispatch]);

    // 회원가입 성공/실패 처리
    useEffect(() => {
      if (authError) {
        console.log('오류발생');
        console.log(authError);
        return ;
      }
      if (auth) {
        console.log('회원기입 성공');
        console.log(auth);
        return ;
      }
    }, [auth, authError]);

    return (
        <SignForm
          type='register'
          form ={form}
          onChange={onChange}
          onSubmit={onSubmit}
        />
    );
};

export default SignUpForm;