import React, { useEffect } from 'react';
import { UserContainer } from '../../templates/UserContainer';
import { WeightManagement } from '../../organisms/Weight/WeightManagement';
import { useHistory } from 'react-router-dom';

interface WeightIndexProps {
  checkIsLogin: Function
}

export const WeightIndex: React.FC<WeightIndexProps> = ({checkIsLogin}) => {
  const history = useHistory();

  useEffect(() => {
    if (!checkIsLogin()) {
      history.push("/");
    }
  })

  return (
    <>
      <UserContainer title="" body={<WeightManagement/>}/>
    </>
  )
}