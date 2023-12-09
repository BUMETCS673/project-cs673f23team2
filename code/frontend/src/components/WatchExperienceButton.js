import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WatchExperienceButton({ icon }) {

  return (
    <button data-cy="EntertainmentMode" className='WatchExperienceButtons'>
        <FontAwesomeIcon icon={icon} />
    </button>
  );
}
