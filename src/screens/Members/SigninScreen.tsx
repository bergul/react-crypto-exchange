import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Box from '../../components/Common/Box';
import MainLayout from '../../layouts/MainLayout';
import FormInput from '../../components/Forms/FormInput';
import FormButton from '../../components/Forms/FormButton';

// interfaces
interface IFormProps {
  email: string;
  password: string;
}

const SigninScreen: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<IFormProps>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/dashboard'); // Giriş başarılı olursa yönlendirme yapın
    } catch (error) {
      setError('Email veya şifre hatalı.');
      console.error('Email sign-in error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); 
    } catch (error) {
      setError((error as any).message);
    }
  };

  return (
    <MainLayout>
      <div className='flex flex-center full-height'>
        <div className='login no-select'>
          <Box>
            <div className='box-vertical-padding box-horizontal-padding'>
              <div>
                <div className='form-logo center'>
                  <img
                    draggable='false'
                    alt='Crypto Exchange'
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                  />
                </div>
                <h1 className='form-title center'>Üye girişi</h1>
                <p className='form-desc center'>
                  Lütfen tarayıcınızın adres çubuğunda{' '}
                  <strong>https://pro.cryptoexchange.com</strong> yazdığından emin olunuz.
                </p>
                <form className='form' onSubmit={handleEmailSignIn} noValidate>
                  <div className='form-elements'>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='email'>Email Address</label>
                        <FormInput
                          type='email'
                          name='email'
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          value={form.email}
                          placeholder='Email adresinizi girin'
                        />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='password'>Şifreniz</label>
                        <FormInput
                          type='password'
                          name='password'
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          value={form.password}
                          placeholder='Şifrenizi girin'
                        />
                      </div>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='form-line'>
                      <div className='full-width right'>
                        <Link to='/members/forgot-password'>Şifremi unuttum</Link>
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='buttons'>
                        <FormButton onClick={handleEmailSignIn} type='submit' text='Email ile Giriş Yap' />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='buttons'>
                        <FormButton  type='' onClick={handleGoogleSignIn} text='Google ile Giriş Yap' />
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='center'>
                        <p>
                          Hesabınız yoksa <Link to='/members/signup'>yeni hesap</Link> oluşturun.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </MainLayout>
  );
};

export default SigninScreen;
