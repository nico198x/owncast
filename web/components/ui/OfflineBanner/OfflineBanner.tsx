/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Divider } from 'antd';
import { FC } from 'react';
import { formatDistanceToNow } from 'date-fns';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { useTranslation } from 'next-export-i18n';
import styles from './OfflineBanner.module.scss';

// Lazy loaded components

const ClockCircleOutlined = dynamic(() => import('@ant-design/icons/ClockCircleOutlined'), {
  ssr: false,
});

export type OfflineBannerProps = {
  streamName: string;
  customText?: string;
  lastLive?: Date;
  notificationsEnabled: boolean;
  fediverseAccount?: string;
  showsHeader?: boolean;
  onNotifyClick?: () => void;
  onFollowClick?: () => void;
  className?: string;
};

export const OfflineBanner: FC<OfflineBannerProps> = ({
  streamName,
  customText,
  lastLive,
  notificationsEnabled,
  fediverseAccount,
  showsHeader = true,
  onNotifyClick,
  onFollowClick,
  className,
}) => {
  const { t } = useTranslation();

  const handleActionClick = (event: any) => {
    const target = event.target as HTMLElement;
    const action = target.getAttribute('data-action');
    if (action === 'notify') {
      onNotifyClick?.();
    } else if (action === 'follow') {
      onFollowClick?.();
    }
  };

  let text;
  if (customText) {
    text = customText;
  } else if (!customText && notificationsEnabled && fediverseAccount) {
    text = t('offline_banner_notify_and_follow', {
      streamerName: streamName,
      fediverseAccount,
      actionLinkClass: styles.actionLink,
    });
  } else if (!customText && notificationsEnabled) {
    text = t('offline_banner_notify_only', {
      streamerName: streamName,
      actionLinkClass: styles.actionLink,
    });
  } else if (!customText && fediverseAccount) {
    text = t('offline_banner_follow_only', {
      streamerName: streamName,
      fediverseAccount,
      actionLinkClass: styles.actionLink,
    });
  } else {
    text = t('This stream is offline. Check back soon!');
  }

  return (
    <div id="offline-banner" className={classNames(styles.outerContainer, className)}>
      <div className={styles.innerContainer}>
        {showsHeader && (
          <>
            <div className={styles.header}>{streamName}</div>
            <Divider className={styles.separator} />
          </>
        )}
        {customText ? (
          <div className={styles.bodyText} dangerouslySetInnerHTML={{ __html: text }} />
        ) : (
          <div
            className={styles.bodyText}
            dangerouslySetInnerHTML={{ __html: text }}
            onClick={handleActionClick}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleActionClick(e as any);
              }
            }}
          />
        )}

        {lastLive && (
          <div className={styles.lastLiveDate}>
            <ClockCircleOutlined className={styles.clockIcon} />
            {`${t('Last live ago', { timeAgo: formatDistanceToNow(new Date(lastLive)) })}`}
          </div>
        )}
      </div>
    </div>
  );
};
