-- Функция для удаления истекших токенов
CREATE OR REPLACE FUNCTION delete_expired_refresh_tokens()
RETURNS VOID AS $$
BEGIN
  DELETE FROM refresh_tokens
  WHERE expiration_time < NOW();
END;
$$ LANGUAGE plpgsql;

-- Запуск функции каждый день в 3:00 утра
CREATE OR REPLACE EVENT delete_expired_refresh_tokens_event
ON SCHEDULE EVERY '1 day' STARTS '03:00:00'
DO $$
  PERFORM delete_expired_refresh_tokens();
$$ LANGUAGE plpgsql;