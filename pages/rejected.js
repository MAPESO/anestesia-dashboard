// Packages
import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/core';

// Components
import { Layout } from '../components/Dashboard/Layout';
import { SpinnerLoad } from '../components/Spinner';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MessageInfo } from '../components/MessageInfo';

const Rejected = () => {
  const [users, setUser] = useState([]);
  const [isLoading, setLoading] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('/api/rejected');
      res.json().then(res => setUser(res));
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleClick = (index, item) => {
    fetch('/api/removeUser', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, userRemove: true })
    }).then(() => {
      const removeItem = [...users];
      removeItem.splice(index, 1);
      setUser(removeItem);
    });
  };
  const checkUsers = () => {
    if (users.length) {
      return users.map((item, index) => (
        <Card key={item._id} index={index} user={item}>
          <Button type="error" action={() => handleClick(index, item)}>
            Borrar usuario
          </Button>
        </Card>
      ));
    }
    return <MessageInfo />;
  };
  return (
    <Layout tabIndex={2}>
      <Flex align="center" justify="center" m={10}>
        {isLoading ? <SpinnerLoad /> : <Box>{checkUsers()}</Box>}
      </Flex>
    </Layout>
  );
};

export default Rejected;
