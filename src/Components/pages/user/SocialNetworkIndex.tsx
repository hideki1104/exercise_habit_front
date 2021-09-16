import React from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { SocialNetworkList } from '../../SocialNetwork/SocialNetworkList';

interface SocialNetworkIndexProps {

}

export const SocialNetworkIndex: React.FC<SocialNetworkIndexProps> = () => {

  return (
    <>
      <UserContainer title="交流場" body={<SocialNetworkList/>}/>
    </>
  )
}