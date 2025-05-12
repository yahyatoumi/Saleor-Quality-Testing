# Saleor E-commerce Platform - Bug Reports

This document outlines the issues identified during testing of the Saleor e-commerce platform. Each issue is documented with detailed reproduction steps, expected vs. actual behavior, severity assessment, and potential root causes.

## Issue Categories

1. [User Authentication Issues](#1-user-authentication-issues)
2. [User Interface Issues](#2-user-interface-issues)
3. [Feature Limitations](#3-feature-limitations)

---

## 1. User Authentication Issues

### Issue #1: Unable to login with user accounts created via API

**Severity:** High  
**Priority:** P1  
**Component:** Authentication

#### Description
Users created through the API or admin dashboard cannot successfully log in through the storefront interface, despite the accounts existing in the system.

#### Steps to Reproduce
1. Create a new user account via API or admin dashboard
2. Verify the user exists in the admin dashboard (http://localhost:9000)
3. Navigate to storefront (http://localhost:3000)
4. Attempt to login with the newly created user's credentials

#### Expected Behavior
The user should be able to successfully log in with valid credentials.

#### Actual Behavior
Login fails despite valid credentials. No error message is displayed to indicate the reason for failure.

#### Possible Causes
- Authentication mechanism may not be properly synchronized between the admin backend and the storefront
- User account activation may be required but not automatically performed
- Token validation issues between services
- Channel configuration issues preventing proper user authentication

#### Impact
This issue prevents new users from accessing their accounts, severely impacting user experience and potentially leading to lost sales and customer frustration.

#### Suggested Fix
Investigate the user creation workflow to ensure that accounts created via API have the correct status and attributes needed for storefront authentication. Additionally, implement proper error messaging to inform users of specific issues with their login attempts.

---

### Issue #2: No redirect after successful login

**Severity:** Medium  
**Priority:** P2  
**Component:** Navigation

#### Description
After successfully logging in, users remain on the login page instead of being redirected to the home page or previous page.

#### Steps to Reproduce
1. Navigate to login page
2. Enter valid credentials
3. Click login button

#### Expected Behavior
User should be redirected to the home page or the page they were on before login.

#### Actual Behavior
User remains on the login page after successful login. The only indication of successful login is the user icon appearing in the navigation bar.

#### Possible Causes
- Missing redirect logic in the authentication flow

#### Impact
This creates a confusing user experience as users may not immediately realize they are logged in, potentially leading to repeated login attempts or abandoning the site.

#### Suggested Fix
Implement proper redirection after successful login, either to the home page by default or to the page the user was attempting to access before being prompted to log in.

---

## 2. User Interface Issues

No significant UI issues were identified during testing beyond those related to authentication flows.

---

## 3. Feature Limitations

### Issue #3: No user registration UI in storefront

**Severity:** High  
**Priority:** P1  
**Component:** User Management

#### Description
The storefront application does not provide a user interface for new customers to register accounts. This is a critical missing feature for an e-commerce platform.

#### Steps to Reproduce
1. Navigate to the storefront
2. Look for registration options
3. Check login page for registration links

#### Expected Behavior
E-commerce platform should offer self-service registration with a user-friendly form and clear calls to action.

#### Actual Behavior
No registration form or process is available to end users through the storefront UI. New user accounts can only be created through the admin dashboard or API.

#### Possible Causes
This could be:
- A deliberate design decision for this deployment
- A missing feature in the current implementation

#### Impact
Without a self-service registration option, new customers cannot create accounts, which:
- Prevents customers from saving their information for future purchases
- Limits the ability to track order history
- Reduces customer engagement and loyalty
- Creates additional administrative overhead for account creation

#### Suggested Fix
Implement a user registration interface in the storefront that:
- Allows users to create accounts with email and password
- Validates input and provides clear error messages
- Implements proper security measures (CAPTCHA, rate limiting)
- Offers a streamlined registration process integrated with checkout

---

## Summary of Findings

The issues identified during testing primarily relate to user account management and authentication flows. While the core product browsing and cart functionality appear to work correctly, the limitations in user registration and authentication present significant barriers to a complete e-commerce experience.

The most critical issues to address are:
1. Adding user registration functionality to the storefront
2. Fixing authentication for API-created user accounts
3. Implementing proper post-login navigation

These improvements would significantly enhance the user experience and remove key obstacles to customer acquisition and retention.