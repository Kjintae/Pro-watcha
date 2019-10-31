import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import SignForm from '../../component/Sign/SignForm';

const SignUpForm = () => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) =>({
      form: auth.register
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
      // 구현예정
    };

    // 컴포넌트가 처음 랜터링 될 때 form을 초기화함.
    useEffect(() => {
      dispatch(initializeForm('register'));
    }, [dispatch]);

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