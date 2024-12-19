import { useState } from 'react';
import { auth } from '../../config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';

// hooks
import useFormEvents from '../../hooks/useFormEvents';

// components
import Box from '../../components/Common/Box';
import MainLayout from '../../layouts/MainLayout';
import FormInput from '../../components/Forms/FormInput';
import FormButton from '../../components/Forms/FormButton';

// interfaces
interface IFormProps {
  phone: string;
}

const ForgotScreen: React.FC = () => {
  const { onlyNumbers } = useFormEvents();

  const [formValues, setFormValues] = useState<IFormProps>({
    phone: '',
  });

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles input changes in the forgot password form.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   * @returns {void}
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  /**
   * Handles the form submission for the forgot password screen.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {void}
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Şifre sıfırlama e-postası gönderildi.');
      setError(null);
    } catch (error) {
      setError('E-posta gönderilemedi. Lütfen tekrar deneyin.');
      setMessage(null);
      console.error('Password reset error:', error);
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
                <h1 className='form-title center'>Şifre sıfırlama</h1>
                <p className='form-desc center'>
                  Lütfen kayıtlı telefon numaranızı giriniz. Şifre sıfırlama bilgilerinizi
                  göndereceğiz.
                </p>
                <form className='form' onSubmit={handleSubmit} noValidate>
                  <div className='form-elements'>
                    <div className='form-line'>
                      <div className='full-width'>
                        <label htmlFor='email'>Email Address</label>
                        <FormInput
                          type='email'
                          name='email'
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          placeholder='E-posta adresinizi girin'
                        />
                      </div>
                    </div>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='form-line'>
                      <div className='full-width right'>
                        <Link to='/'>Giriş yap</Link>
                      </div>
                    </div>
                    <div className='form-line'>
                      <div className='buttons'>
                        <FormButton type='submit' text='Gönder' onClick={handleSubmit} />
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

export default ForgotScreen;
