/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-danger */
import { Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'next-export-i18n';
import styles from './FollowModal.module.scss';
import { FollowForm } from './FollowForm';

export type FollowModalProps = {
  handleClose: () => void;
  account: string;
  name: string;
};

export const FollowModal: FC<FollowModalProps> = ({ handleClose, account, name }) => {
  const { t } = useTranslation();

  return (
    <Space direction="vertical" id="follow-modal">
      <div
        className={styles.header}
        dangerouslySetInnerHTML={{
          __html: t('follow_modal_header_with_link', {
            learnMoreUrl: 'https://owncast.online/join-fediverse',
          }),
        }}
      />
      <div className={styles.account}>
        <img src="/logo" alt="logo" className={styles.logo} />
        <div className={styles.username}>
          <div className={styles.name}>{name}</div>
          <div>{account}</div>
        </div>
      </div>

      <FollowForm handleClose={handleClose} />
    </Space>
  );
};
