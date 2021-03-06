<?php
/*
* UserEngine.php - Main component file
*
* This file is part of the User component.
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\User;

use Auth;
use Hash;
use Session;
use Carbon\Carbon;
use App\Yantrana\Support\MailService;
use App\Yantrana\Components\User\Repositories\UserRepository;
use App\Yantrana\Components\ShoppingCart\Repositories\OrderRepository;
use App\Yantrana\Components\User\Blueprints\UserEngineBlueprint;
use Breadcrumb;
use Socialite;

class UserEngine implements UserEngineBlueprint
{
	/**
	 * @var UserRepository - User Repository
	 */
	protected $userRepository;

	/**
	 * @var MailService
	 */
	protected $mailService;

	/**
	 * @var OrderRepository - Order Repository
	 */
	protected $orderRepository;

	/**
	 * Constructor.
	 *
	 * @param UserRepository  $userRepository  - User Repository
	 * @param MailService     $mailService     - Mail Service
	 * @param OrderRepository $orderRepository - Order Repository
	 *                                         -----------------------------------------------------------------------*/
	public function __construct(UserRepository $userRepository,
	                            MailService $mailService,
	                            OrderRepository $orderRepository)
	{
		$this->userRepository  = $userRepository;
		$this->mailService     = $mailService;
		$this->orderRepository = $orderRepository;
	}

	/**
	 * Prepare users list.
	 *
	 * @param number $status
	 *
	 * @return eloquent collection object
	 *---------------------------------------------------------------- */
	public function prepareUsersList($status)
	{
		return $this->userRepository->fetchUsers($status);
	}

	/**
	 * Show captcha.
	 *
	 * @return bool
	 *---------------------------------------------------------------- */
	public function showCaptcha()
	{
		// Check if count greater than 5
		if ($this->userRepository->fetchLoginAttemptsCount() >= getStoreSettings('show_captcha'))
		{
			return true;
		}

		return false;
	}

	/**
	 * Prepare login attempts for this client ip.
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function prepareLoginAttempts()
	{
		$showCaptcha = false;

		// Check if count exist
		if ($this->showCaptcha())
		{
			$showCaptcha = true;
		}

		return __engineReaction(1, ['show_captcha' => $showCaptcha]);
	}

	/**
	 * Process user login request using user repository & return
	 * engine reaction.
	 *
	 * @param array $input
	 *
	 * @return array
	 *---------------------------------------------------------------- */
//	public function processLogin($input)
//	{
//		// Check if user authenticated
//		if ($this->userRepository->login($input))
//		{
//			return __engineReaction(1, [
//				'auth_info'   => getUserAuthInfo(),
//				// 'redirect_intended' 		=> Session::get('redirect_intended'),
//				'intendedUrl' => Session::get('intendedUrl'),
//				// 'redirect_intended_order' 	=> Session::get('redirect_intended_order_id')
//			]);
//		}
//
//		$showCaptcha = false;
//
//		// Check if count exist
//		if ($this->showCaptcha())
//		{
//			$showCaptcha = true;
//		}
//
//		return __engineReaction(2, ['show_captcha' => $showCaptcha]);
//	}

	/**
	 * Process user login request using user repository & return
	 * engine reaction.
	 *
	 * @param array $input
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processLogin($input, $loginType = 1)
	{
		if (__ifIsset($input['email']))
		{
			$varifyEmail = $this->userRepository->varifyEmail($input['email']);

			// check the email is non-active
			if ($varifyEmail)
			{
				return __engineReaction(2, ['isInActive' => true]);
			}
		}

		// Check if user authenticated
		if ($logged = $this->userRepository->login($input, $loginType))
		{
			return __engineReaction(1, [
				'auth_info'   => getUserAuthInfo(), /*,
             'redirect_intended'        => Session::get('redirect_intended'),*/
				'intendedUrl' => Session::get('intendedUrl'), /*,
             'redirect_intended_order'  => Session::get('redirect_intended_order_id')*/
			]);
		}

		$showCaptcha = false;

		// Check if count exist
		if ($this->showCaptcha())
		{
			$showCaptcha = true;
		}

		return __engineReaction(2, ['show_captcha' => $showCaptcha]);
	}

	/**
	 * Process user logout action.
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processLogout()
	{
		if (Session::has('intendedUrl'))
		{
			Session::forget('intendedUrl');
		}

		Auth::logout(); // logout user

		return __engineReaction(1, ['auth_info' => getUserAuthInfo()]);
	}

	/**
	 * Process forgot password request based on passed email address &
	 * send password reminder on enter email address.
	 *
	 * @param string $email
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function sendPasswordReminder($email)
	{
		$user = $this->userRepository
			->fetchActiveUserByEmail($email, true);

		// Check if user record exist
		if (empty($user))
		{
			return __engineReaction(2);
		}

		// Delete old password reminder for this user
		$this->userRepository->deleteOldPasswordReminder($email);

		$token = __generateUID();

		// Check for if password reminder added
		if (!$this->userRepository->storePasswordReminder($email, $token))
		{
			return __engineReaction(2);
		}

		$messageData = [
			'firstName'      => $user->fname,
			'lastName'       => $user->lname,
			'email'          => $email,
			'fullName'       => $user->fname . ' ' . $user->lname,
			'expirationTime' => config('__tech.account.password_reminder_expiry'),
			'userId'         => $user->id,
			'token'          => $token,
		];

		// if reminder mail has been sent
		if ($this->mailService->notifyCustomer('Password Reminder', 'account.password-reminder', $messageData, $email))
		{
			return __engineReaction(1); // success reaction
		}

		return __engineReaction(2); // error reaction
	}

	/**
	 * Process reset password request.
	 *
	 * @param array  $input
	 * @param string $reminderToken
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processResetPassword($input, $reminderToken)
	{
		$email = $input['email'];

		$count = $this->userRepository
			->fetchPasswordReminderCount($reminderToken, $email);

		// Check if reminder count not exist on 0
		if (!$count > 0)
		{
			return __engineReaction(18);
		}

		$user = $this->userRepository->fetchActiveUserByEmail($email);

		// Check if user record exist
		if (empty($user))
		{
			return __engineReaction(18);
		}

		// Check if user password updated
		if ($this->userRepository
			->resetPassword($user, $input['password']))
		{
			return __engineReaction(1);
		}

		return __engineReaction(2);
	}

	/**
	 * Process user update password request.
	 *
	 * @param array $inputData
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processUpdatePassword($inputData)
	{
		$user = Auth::user();

		// Check if logged in user password matched with entered password
		if (!Hash::check($inputData['current_password'], $user->password))
		{
			return __engineReaction(3);
		}

		// Check if user password updated
		if ($this->userRepository->updatePassword($user, $inputData['new_password']))
		{
			$getRoute = [];

			$getRoute = ['passwordRoute' => route('user.change_password')];

			return __engineReaction(1, $getRoute);
		}

		return __engineReaction(14);
	}

	/**
	 * Get temp email to user.
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function getChangeEmailDetails()
	{
		$tempMailData = $this->userRepository->fetchChangeEmailDetails();

		$newEmail      = false;
		$formattedDate = $humanReadableDate = '';

		// Check if new email is exist
		if (!__isEmpty($tempMailData))
		{
			$newEmail          = $tempMailData->new_email;
			$formattedDate     = formatStoreDateTime($tempMailData->created_at);
			$humanReadableDate = Carbon::createFromFormat('Y-m-d H:i:s', $tempMailData->created_at)->diffForHumans();
		}

		return __engineReaction(1, [
			'newEmail'          => $newEmail,
			'formattedDate'     => $formattedDate,
			'humanReadableDate' => $humanReadableDate,
		]);
	}

	/**
	 * Send new email activation reminder.
	 *
	 * @param array $inputData
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function sendNewEmailActivationReminder($inputData)
	{
		$user = Auth::user();

		// Check if user entered correct password or not
		if (!Hash::check($inputData['current_password'], $user->password))
		{
			return __engineReaction(3, [], __('Please check your password.'));
		}

		// delete olde new email request
		$this->userRepository->deleteOldEmailChangeRequest();

		$newEmail = $inputData['new_email'];

		$activationRequired = getStoreSettings('activation_required_for_change_email');

		// Check if activation required for change email then send activation message
		if (is_null($activationRequired) or $activationRequired == 1)
		{
			$activationKey = __generateUID();

			// Check for if new email activation store
			if (!$this->userRepository
				->storeNewEmailReminder($newEmail, $activationKey))
			{
				return __engineReaction(2, [], __('Email not send.'));
			}

			// prepare data for email
			$messageData = [
				'firstName'      => $user->fname,
				'lastName'       => $user->lname,
				'email'          => $newEmail,
				'fullName'       => $user->fname . ' ' . $user->lname,
				'expirationTime' => config('__tech.account.change_email_expiry'),
				'userID'         => $user->id,
				'activationKey'  => $activationKey,
			];

			// Check if activation link send
			if ($this->mailService->notifyCustomer('New Email Activation', 'account.new-email-activation', $messageData, $newEmail))
			{
				return __engineReaction(1, ['activationRequired' => true], __('New email activation link has been sent to your new email address, please check your email.')); // success reaction
			}

			return __engineReaction(2, [], __('Email not send.')); // error reaction
		}

		// Check if user email updated
		if ($this->userRepository->updateEmail($newEmail))
		{
			return __engineReaction(1, ['activationRequired' => false], __('Your email address updated successfully.'));
		}

		return __engineReaction(2, [], __('Your email address not updated.'));
	}

	/**
	 * Activate new email.
	 *
	 * @param number $userID
	 * @param string $activationKey
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function newEmailActivation($userID, $activationKey)
	{
		// Fetch temporary email
		$tempEmail = $this->userRepository
			->fetchTempEmail($userID, $activationKey);

		// Check if temp email exist for this activation key
		if (empty($tempEmail))
		{
			return __engineReaction(18);
		}

		// Check if user email updated
		if ($this->userRepository->updateEmail($tempEmail->new_email))
		{
			return __engineReaction(1);
		}

		return __engineReaction(2);
	}

	/**
	 * Process user register request.
	 *
	 * @param array $input
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processRegister($input)
	{
		// get email of deleted user
		$usersEmail = $this->userRepository->fetchEmailOfUsers()->toArray();

		$emailCollection = [];

		// Delete never activated users old than set time in config account activation hours
		// здесь вылетает ошибка не стал разбираться почему - за это пока не заплатят
		// $this->userRepository->deleteNonActicatedUser();

		// push email into array
		foreach ($usersEmail as $key => $email)
		{
			if (($email['email'] == strtolower($input['email'])) and ($email['status'] === 2))
			{
				return __engineReaction(3, ['isInActive' => true]);
			}

			$emailCollection[] = $email['email'];
		}

		// check if email already exist
		if (in_array(strtolower($input['email']), $emailCollection, true) == true)
		{
			return __engineReaction(3, [], __('Your account has been already exist, please contact system administrator.'));
		}

		$newUser = $this->userRepository->storeNewUser($input);

		// Check if user stored
		if (empty($newUser))
		{
			return __engineReaction(2, [], __('Registration process failed.'));
		}

		// Check if activation required for new user then send activation message
		if (getStoreSettings('activation_required_for_new_user'))
		{

			// prepare data for email view
			$messageData = [
				'firstName'      => $newUser->fname,
				'lastName'       => $newUser->lname,
				'email'          => $newUser->email,
				'fullName'       => $newUser->fname . ' ' . $newUser->lname,
				'expirationTime' => configItem('account.activation_expiry'),
				'userID'         => $newUser->id,
				'activationKey'  => $newUser->remember_token,
			];

// To-do: Тоже нужно разбираться почему и как не уходят письма
//			$this->mailService->notifyCustomer('Account Activation', 'account.account-activation', $messageData, $newUser->email);

			return __engineReaction(1, ['activationRequired' => true], __('User register successfully.')); // success reaction
		}

		return __engineReaction(1, ['activationRequired' => false], __('Your registration process completed successfully. Please logged in for uses.')); // success reaction
	}

	/**
	 * User account activation.
	 *
	 * @param number $userID
	 * @param string $activationKey
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processAccountActivation($userID, $activationKey)
	{
		$neverActivatedUser = $this->userRepository
			->fetchNeverActivatedUser(
				$userID,
				$activationKey
			);

		// Check if never activated user exist or not
		if (empty($neverActivatedUser))
		{
			return __engineReaction(18);
		}

		// Check if user activated successfully
		if ($this->userRepository->activateUser($neverActivatedUser))
		{
			return __engineReaction(1);
		}

		return __engineReaction(2);
	}

	/**
	 * Prepare user profile information.
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function prepareProfileDetails()
	{
		$userProfile = $this->userRepository->fetchProfile();

		return __engineReaction(1, ['profile' => $userProfile]);
	}

	/**
	 * create profile update breadcrumb.
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function breadcrumbGenerate($breadcrumbType)
	{
		$breadCrumb = Breadcrumb::generate($breadcrumbType);

		// Check if breadcrumb not empty
		if (!__isEmpty($breadCrumb))
		{
			return __engineReaction(1, [
				'breadCrumb' => $breadCrumb,
			]);
		}

		return __engineReaction(2, [
			'breadCrumb' => null,
		]);
	}

	/**
	 * create profile update breadcrumb.
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function getChangeRequestedEmail()
	{
		return __engineReaction(1, $this->userRepository->fetchChangeEmailRequested());
	}

	/**
	 * Update user profile & return response.
	 *
	 * @param array $input
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processUpdateProfile($input)
	{
		// Check if profile updated
		if ($this->userRepository->updateProfile($input))
		{
			return __engineReaction(1, ['auth_info' => getUserAuthInfo()]);
		}

		return __engineReaction(14);
	}

	/**
	 * Process user delete request.
	 *
	 * @param number $userID
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processUserDelete($userID)
	{
		$user = $this->userRepository->fetchByID($userID);

		// Check if user exist or we are trying to delete admin user
		if (empty($user) or $user->role === 1)
		{
			return __engineReaction(18); // not exist record
		}

		// Check if user delete successfully
		if ($this->userRepository->delete($user))
		{
			return __engineReaction(1, [
				'message' => __('__fullName__ user deleted successfully.', [
						'__fullName__' => $user->fname . ' ' . $user->lname,
					]
				),
			]);
		}

		return __engineReaction(2);
	}

	/**
	 * Process user restore request.
	 *
	 * @param number $userID
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processUserRestore($userID)
	{
		$user = $this->userRepository->fetchByID($userID);

		// Check if user records exist
		if (empty($user) or $user->role === 1)
		{
			return __engineReaction(18); // not exist record
		}

		// Check if user restore successfully
		if ($this->userRepository->restore($user))
		{
			return __engineReaction(1, [
				'message' => __('__name__ user restore successfully.', [
						'__name__' => $user->fname . ' ' . $user->lname,
					]
				),
			]);
		}

		return __engineReaction(2);
	}

	/**
	 * Varify password reminder token.
	 *
	 * @param string $reminderToken
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function varifyPasswordReminderToken($reminderToken)
	{
		$count = $this->userRepository->fetchPasswordReminderCount($reminderToken);

		// Check if reminder count not exist on 0
		if (!$count > 0)
		{
			return __engineReaction(18, __('Token mismatch.'));
		}

		return __engineReaction(1);
	}

	/**
	 * Process user contact request.
	 *
	 * @param array $inputData
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processContact($inputData)
	{
		// mail subject
		$subject  = $inputData['subject'];
		$formType = 1;

		// if form type dialog then add order word in subject message
		if (array_has($inputData, 'formType') and $inputData['formType'] == 2)
		{
			$subject = $inputData['subject'] . ' Order';

			$formType = $inputData['formType'];
		}

		$orderDetailsUrl = '';
		$orderUID        = '';

		// Check if order UID is not empty
		if (!empty($inputData['orderUID']))
		{
			$orderUID = $inputData['orderUID'];

			$orderDetailsUrl = route('my_order.details', $orderUID);
		}

		$messageData = [
			'senderName'      => $inputData['fullName'],
			'mailText'        => $inputData['message'],
			'senderEmail'     => $inputData['email'],
			'formType'        => $formType,
			'orderDetailsUrl' => $orderDetailsUrl,
			'orderUID'        => $orderUID,
			'isloggedIn'      => isLoggedIn(),
		];

		if ($this->mailService
			->notifyAdmin($subject, 'contact', $messageData, 2))
		{
			return __engineReaction(1); // success reaction
		}

		return __engineReaction(2); // error reaction
	}

	/**
	 * resend activation email link.
	 *
	 * @param array $input
	 *---------------------------------------------------------------- */
	public function resendActivationEmail($input)
	{
		// Delete never activated users old than 48 hours
		$this->userRepository->deleteNonActicatedUser();

		$email = $input['email'];

		$activeUser = $this->userRepository
			->fetchActiveUserByEmail($email);

		// Check if is active user
		if (!empty($activeUser))
		{
			return __engineReaction(3);
		}

		$user = $this->userRepository
			->getNonActicatedUserByEmail($email);

		// Check if user empty
		if (__isEmpty($user))
		{
			return __engineReaction(2, null, __('You entered email address not availabe in system.')); // error reaction
		}

		$messageData = [
			'firstName'      => $user->fname,
			'lastName'       => $user->lname,
			'email'          => $email,
			'fullName'       => $user->fname . ' ' . $user->lname,
			'expirationTime' => config('__tech.account.change_email_expiry'),
			'userID'         => $user->id,
			'activationKey'  => $user->remember_token,
		];

		if ($this->mailService
			->notifyCustomer('Account Activation', 'account.account-activation', $messageData, $email))
		{
			return __engineReaction(1); // success reaction
		}

		return __engineReaction(2); // error reaction
	}

	/**
	 * Process change password by admin.
	 *
	 * @param number $userID
	 * @param array  $input
	 *---------------------------------------------------------------- */
	public function processChangePassword($userID, $input)
	{
		$user = $this->userRepository->fetchByID($userID);

		// check if user exist
		if (__isEmpty($user))
		{
			return __engineReaction(18);
		}

		// Check if user password updated
		if ($this->userRepository->updatePassword($user, $input['new_password']))
		{
			return __engineReaction(1);
		}

		return __engineReaction(14);
	}

	/**
	 * Prepare details for user.
	 *
	 * @param number $userID
	 *
	 * @return engine reaction
	 *---------------------------------------------------------------- */
	public function prepareUserDetails($userID)
	{
		// Get user details
		$userDetails = $this->userRepository->fetchByID($userID);

		if (__isEmpty($userDetails))
		{
			return __engineReaction(18);
		}

		// Get order details related to the user
		$orderDetails = $this->orderRepository
			->fetchOrderByUserID($userID);

		// Prepare user details array
		$userData = [
			'fullName'     => $userDetails->fname . ' ' . $userDetails->lname,
			'email'        => $userDetails->email,
			'lastLogin'    => ($userDetails->last_login)
				? formatStoreDateTime($userDetails->last_login)
				: '',
			'lastIp'       => ($userDetails->last_ip)
				? $userDetails->last_ip
				: '',
			'creationDate' => formatStoreDateTime($userDetails->created_at),
			'lastOrder'    => ($orderDetails['lastOrder']['created_at'])
				? formatStoreDateTime($orderDetails['lastOrder']['created_at'])
				: '',
			'lastOrderUID' => $orderDetails['lastOrder']['order_uid'],
			'totalOrder'   => $orderDetails['orderCount'],
		];

		return __engineReaction(1, $userData);
	}

	/**
	 * send mail to the user
	 *
	 * @param array $input
	 *
	 * @return void
	 *---------------------------------------------------------------- */

	public function prepareInfo($userId)
	{
		$user = $this->userRepository->fetchByID($userId);

		if (__isEmpty($user))
		{
			return __engineReaction(18, __('User does not exist.'));
		}

		return __engineReaction(1, [
			'fullName' => $user->fname . ' ' . $user->lname,
			'email'    => $user->email,
			'id'       => $user->id
		]);
	}

	/**
	 * send mail to the user
	 *
	 * @param array $input
	 *
	 * @return void
	 *---------------------------------------------------------------- */

	public function userContactProcess($inputData)
	{
		// mail subject
		$subject = $inputData['subject'];

		$messageData = [
			'fullName'     => $inputData['fullName'],
			'mailText'     => $inputData['message'],
			'senderEmail'  => $inputData['email'],
			'emailMessage' => $inputData['message']
		];
		if ($this->mailService
			->notifyToUser($subject, 'account.contact', $messageData, $inputData['email']))
		{
			return __engineReaction(1); // success reaction
		}

		return __engineReaction(2); // error reaction
	}


	/**
	 * Process Add New User Request
	 *
	 * @param array $input
	 *
	 * @return array
	 *---------------------------------------------------------------- */
	public function processAdd($input)
	{
		// Check if user is added
		if ($this->userRepository->store($input))
		{
			return __engineReaction(1, null, __('New user added successfully.'));
		}

		return __engineReaction(2, null, __('User not added.'));
	}
}
