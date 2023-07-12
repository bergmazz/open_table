import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllRestaurants from "./components/Restaurants/AllRestaurants";
import HomePage from "./components/HomePage";
import RestaurantPage from "./components/Restaurants/RestaurantPage";
import UserProfile from "./components/UserProfile";
import CreateReview from "./components/Reviews/NewReview";
import ReservationForm from "./components/ReservationForm"
import CreateRestaurant from "./components/CreateRestaurant";
import OwnerRestaurant from "./components/UserProfile/owned";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/new-restaurant">
            <CreateRestaurant />
          </Route>
          <Route exact path="/restaurants/:id/reserve">
            <ReservationForm />
          </Route>
          <Route exact path="/restaurants/:id">
            <RestaurantPage />
          </Route>
          <Route exact path='/restaurants/:id/reviews'>
            <CreateReview />
          </Route>
          <Route exact path="/restaurants">
            <AllRestaurants />
          </Route>
          <Route exact path="/user">
            <UserProfile />
          </Route>
          <Route exact path="/user/restaurants">
            <OwnerRestaurant />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
