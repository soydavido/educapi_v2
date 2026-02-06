export const MAIN_ERRORS = {
  financialCourses: {
    entityNotFound: 'apiResponse.error.main.financialCourses.entityNotFound',
    courseBadRequest:
      'apiResponse.error.main.financialCourses.courseBadRequest',
    courseNotFound: 'apiResponse.error.main.financialCourses.courseNotFound',
    coursesNotFound: 'apiResponse.error.main.financialCourses.coursesNotFound',
    topicsNotFound: 'apiResponse.error.main.financialCourses.topicsNotFound',
    idEntityInvalid: 'apiResponse.error.main.financialCourses.idEntityInvalid',
    idFinancialCourseNotReceived:
      'apiResponse.error.main.financialCourses.idFinancialCourseNotReceived',
  },
  mainDashboard: {
    invalidRequest:
      'apiResponse.error.main.mainDashboard.natural.invalidRequest',
    dateRangeInvalid:
      'apiResponse.error.main.mainDashboard.natural.dateRangeInvalid',
    dateRangeEmpty:
      'apiResponse.error.main.mainDashboard.natural.dateRangeEmpty',
    idCurrencyInvalid:
      'apiResponse.error.main.mainDashboard.natural.idCurrencyInvalid',
    idCurrencyEmpty:
      'apiResponse.error.main.mainDashboard.natural.idCurrencyEmpty',
    startDateEmpty:
      'apiResponse.error.main.mainDashboard.natural.startDateEmpty',
    endDateEmpty: 'apiResponse.error.main.mainDashboard.natural.endDateEmpty',
  },
  budget: {
    budgetNotFound: 'apiResponse.error.main.budget.budgetNotFound',
    budgetForMonthExists: 'apiResponse.error.main.budget.budgetForMonthExists',
    invalidMonthDate: 'apiResponse.error.main.budget.invalidMonthDate',
    budgetCurrencyNotFound:
      'apiResponse.error.main.budget.budgetCurrencyNotFound',
    transactionCategoryNotFound:
      'apiResponse.error.main.budget.transactionCategoryNotFound',
    budgetCategoryExists: 'apiResponse.error.main.budget.budgetCategoryExists',
    budgetCategoryNotFound:
      'apiResponse.error.main.budget.budgetCategoryNotFound',
  },
  entity: {
    emailRequired: 'apiResponse.error.main.entity.emailRequired',
    clientInvalid: 'apiResponse.error.main.entity.clientInvalid',
    emailAlreadyRegistered:
      'apiResponse.error.main.entity.emailAlreadyRegistered',
    identificationAlreadyExists:
      'apiResponse.error.main.entity.identificationAlreadyExists',
    entityNotFound: 'apiResponse.error.main.entity.entityNotFound',
    invalidEntityId: 'apiResponse.error.main.entity.invalidEntityId',
    filesUploadFailed: 'apiResponse.error.main.entity.filesUploadFailed',
    filesMissing: 'apiResponse.error.main.entity.filesMissing',
    filesInvalidPayload: 'apiResponse.error.main.entity.filesInvalidPayload',
    filesInvalidType: 'apiResponse.error.main.entity.filesInvalidType',
    filesDuplicateType: 'apiResponse.error.main.entity.filesDuplicateType',
    filesTooLarge: 'apiResponse.error.main.entity.filesTooLarge',
  },
  file: {
    forbiddenPath: 'apiResponse.error.file.forbiddenPath',
    invalidRoute: 'apiResponse.error.file.invalidRoute',
    notFound: 'apiResponse.error.file.notFound',
  },
  goal: {
    cannotCreate: 'apiResponse.error.main.goal.cannotCreate',
    notFound: 'apiResponse.error.main.goal.notFound',
    templateLimitReached: 'apiResponse.error.main.goal.templateLimitReached',
    entityNotFoundForUser: 'apiResponse.error.main.goal.entityNotFoundForUser',
    entityTypeNotNatural: 'apiResponse.error.main.goal.entityTypeNotNatural',
  },
  onboarding: {
    questionsRequired: 'apiResponse.error.main.onboarding.questionsRequired',
    questionTemplateNotFound:
      'apiResponse.error.main.onboarding.questionTemplateNotFound',
    answerTemplateNotFound:
      'apiResponse.error.main.onboarding.answerTemplateNotFound',
    answersMismatch: 'apiResponse.error.main.onboarding.answersMismatch',
    singleSelectionOnly:
      'apiResponse.error.main.onboarding.singleSelectionOnly',
    userIdRequired: 'apiResponse.error.main.onboarding.userIdRequired',
    authTokenMissing: 'apiResponse.error.main.onboarding.authTokenMissing',
    authUserNotFound: 'apiResponse.error.main.onboarding.authUserNotFound',
    authUserUpdateFailed:
      'apiResponse.error.main.onboarding.authUserUpdateFailed',
  },
  account: {
    cannotCreate: 'apiResponse.error.main.account.cannotCreate',
    currencyNotFound: 'apiResponse.error.main.account.currencyNotFound',
    duplicateName: 'apiResponse.error.main.account.duplicateName',
    invalidType: 'apiResponse.error.main.account.invalidType',
    entityNotFoundForUser:
      'apiResponse.error.main.account.entityNotFoundForUser',
  },
  transaction: {
    cannotCreate: 'apiResponse.error.main.transaction.cannotCreate',
    notFound: 'apiResponse.error.main.transaction.notFound',
    categoryNotFound: 'apiResponse.error.main.transaction.categoryNotFound',
    currencyNotFound: 'apiResponse.error.main.transaction.currencyNotFound',
    typeNotFound: 'apiResponse.error.main.transaction.typeNotFound',
    merchantNotFound: 'apiResponse.error.main.transaction.merchantNotFound',
    entityNotFoundForUser:
      'apiResponse.error.main.transaction.entityNotFoundForUser',
    invalidAmount: 'apiResponse.error.main.transaction.invalidAmount',
    invalidDate: 'apiResponse.error.main.transaction.invalidDate',
    amountPayedMismatch:
      'apiResponse.error.main.transaction.amountPayedMismatch',
    updateBankFlagFailed:
      'apiResponse.error.main.transaction.updateBankFlagFailed',
  },
  gender: {
    genderInvalid: 'apiResponse.error.main.entity.genderInvalid',
  },
  accountTransfer: {
    cannotCreate: 'apiResponse.error.main.accountTransfer.cannotCreate',
    invalidAccounts: 'apiResponse.error.main.accountTransfer.invalidAccounts',
    invalidFromAccount:
      'apiResponse.error.main.accountTransfer.invalidFromAccount',
    invalidToAccount: 'apiResponse.error.main.accountTransfer.invalidToAccount',
    sameAccount: 'apiResponse.error.main.accountTransfer.sameAccount',
    sameAccountNotAllowed:
      'apiResponse.error.main.accountTransfer.sameAccountNotAllowed',
    fromAccountCurrencyMismatch:
      'apiResponse.error.main.accountTransfer.fromAccountCurrencyMismatch',
    currencyNotFound: 'apiResponse.error.main.accountTransfer.currencyNotFound',
    invalidAmount: 'apiResponse.error.main.accountTransfer.invalidAmount',
    exchangeRateRequired:
      'apiResponse.error.main.accountTransfer.exchangeRateRequired',
    insufficientGoalBalance:
      'apiResponse.error.main.accountTransfer.insufficientGoalBalance',
    insufficientBalance:
      'apiResponse.error.main.accountTransfer.insufficientBalance',
    sameCurrencyNotAllowed:
      'apiResponse.error.main.accountTransfer.sameCurrencyNotAllowed',
    notFound: 'apiResponse.error.main.accountTransfer.notFound',
  },
  auth: {
    tokenMissing: 'apiResponse.error.main.auth.tokenMissing',
    tokenInvalid: 'apiResponse.error.main.auth.tokenInvalid',
    invalidCredentials: 'apiResponse.error.main.auth.invalidCredentials',
    authServerError: 'apiResponse.error.main.auth.authServerError',
    authenticationFailed: 'apiResponse.error.main.auth.authenticationFailed',
    refreshFailed: 'apiResponse.error.main.auth.refreshFailed',
    logoutSuccess: 'apiResponse.success.main.auth.logoutSuccess',
    logoutCompleted: 'apiResponse.success.main.auth.logoutCompleted',
    emailEmpty: 'apiResponse.error.main.auth.emailEmpty',
    emailString: 'apiResponse.error.main.auth.emailString',
  },
  payment: {
    paymentNotFound: 'apiResponse.error.main.payment.paymentNotFound',
  },
  requirement: {
    cannotCreateValue: 'apiResponse.error.main.requirement.cannotCreateValue',
    ownerNotFound: 'apiResponse.error.main.requirement.ownerNotFound',
    missingOwner: 'apiResponse.error.main.requirement.missingOwner',
    invalidPayload: 'apiResponse.error.main.requirement.invalidPayload',
  },
  validation: {
    firstNameRequired: 'apiResponse.error.validation.firstName.required',
    lastNameRequired: 'apiResponse.error.validation.lastName.required',
    emailRequired: 'apiResponse.error.validation.email.required',
    emailInvalid: 'apiResponse.error.validation.email.invalid',
    identificationRequired:
      'apiResponse.error.validation.identification.required',
    identificationInvalidType:
      'apiResponse.error.validation.identification.invalidType',
    identificationLength: 'apiResponse.error.validation.identification.length',
    phoneRequired: 'apiResponse.error.validation.phone.required',
    phoneInvalidType: 'apiResponse.error.validation.phone.invalidType',
    phoneLength: 'apiResponse.error.validation.phone.length',
    phoneInvalidFormat: 'apiResponse.error.validation.phone.invalidFormat',
    birthDateRequired: 'apiResponse.error.validation.birthDate.required',
    birthDateInvalid: 'apiResponse.error.validation.birthDate.invalid',
    addressRequired: 'apiResponse.error.validation.address.required',
    addressInvalidType: 'apiResponse.error.validation.address.invalidType',
    genderRequired: 'apiResponse.error.validation.gender.required',
    genderInvalidType: 'apiResponse.error.validation.gender.invalidType',
    genderInvalidLength: 'apiResponse.error.validation.gender.invalidLength',
    pointsBalanceInvalidType:
      'apiResponse.error.validation.pointsBalance.invalidType',
    pointsBalanceMin: 'apiResponse.error.validation.pointsBalance.min',
    entityTypeInvalidType:
      'apiResponse.error.validation.entityType.invalidType',
    statusInvalidType: 'apiResponse.error.validation.status.invalidType',
    clientSlugRequired: 'apiResponse.error.validation.clientSlug.required',
    clientSlugInvalidType:
      'apiResponse.error.validation.clientSlug.invalidType',
    passwordRequired: 'apiResponse.error.validation.password.required',
    passwordInvalidType: 'apiResponse.error.validation.password.invalidType',
    passwordConfirmationRequired:
      'apiResponse.error.validation.passwordConfirmation.required',
    passwordConfirmationInvalidType:
      'apiResponse.error.validation.passwordConfirmation.invalidType',
    attributesInvalidType:
      'apiResponse.error.validation.attributes.invalidType',
    // Transaction DTO
    transaction_idTransactionCategory_required:
      'apiResponse.error.validation.transaction.idTransactionCategory.required',
    transaction_idTransactionCategory_invalidType:
      'apiResponse.error.validation.transaction.idTransactionCategory.invalidType',
    transaction_idTransactionCategory_min:
      'apiResponse.error.validation.transaction.idTransactionCategory.min',
    transaction_idCurrency_required:
      'apiResponse.error.validation.transaction.idCurrency.required',
    transaction_idCurrency_invalidType:
      'apiResponse.error.validation.transaction.idCurrency.invalidType',
    transaction_idCurrency_min:
      'apiResponse.error.validation.transaction.idCurrency.min',
    transaction_amountToPay_required:
      'apiResponse.error.validation.transaction.amountToPay.required',
    transaction_amountToPay_invalidType:
      'apiResponse.error.validation.transaction.amountToPay.invalidType',
    transaction_amountToPay_maxDecimalPlaces:
      'apiResponse.error.validation.transaction.amountToPay.maxDecimalPlaces',
    transaction_amountPayed_invalidType:
      'apiResponse.error.validation.transaction.amountPayed.invalidType',
    transaction_amountPayed_maxDecimalPlaces:
      'apiResponse.error.validation.transaction.amountPayed.maxDecimalPlaces',
    transaction_idTransactionType_required:
      'apiResponse.error.validation.transaction.idTransactionType.required',
    transaction_idTransactionType_invalidType:
      'apiResponse.error.validation.transaction.idTransactionType.invalidType',
    transaction_idTransactionType_min:
      'apiResponse.error.validation.transaction.idTransactionType.min',
    transaction_idEntityReceiver_invalidType:
      'apiResponse.error.validation.transaction.idEntityReceiver.invalidType',
    transaction_idEntityReceiver_min:
      'apiResponse.error.validation.transaction.idEntityReceiver.min',
    transaction_idEntityStarter_invalidType:
      'apiResponse.error.validation.transaction.idEntityStarter.invalidType',
    transaction_idEntityStarter_min:
      'apiResponse.error.validation.transaction.idEntityStarter.min',
    transaction_idMerchant_invalidType:
      'apiResponse.error.validation.transaction.idMerchant.invalidType',
    transaction_idMerchant_min:
      'apiResponse.error.validation.transaction.idMerchant.min',
    transaction_description_invalidType:
      'apiResponse.error.validation.transaction.description.invalidType',
    transaction_description_maxLength:
      'apiResponse.error.validation.transaction.description.maxLength',
    transaction_transfers_invalidType:
      'apiResponse.error.validation.transaction.transfers.invalidType',
    // AccountTransfer DTO
    accountTransfer_idFromAccount_required:
      'apiResponse.error.validation.accountTransfer.idFromAccount.required',
    accountTransfer_idFromAccount_invalidType:
      'apiResponse.error.validation.accountTransfer.idFromAccount.invalidType',
    accountTransfer_idFromAccount_min:
      'apiResponse.error.validation.accountTransfer.idFromAccount.min',
    accountTransfer_idToAccount_invalidType:
      'apiResponse.error.validation.accountTransfer.idToAccount.invalidType',
    accountTransfer_idToAccount_min:
      'apiResponse.error.validation.accountTransfer.idToAccount.min',
    accountTransfer_idCurrency_required:
      'apiResponse.error.validation.accountTransfer.idCurrency.required',
    accountTransfer_idCurrency_invalidType:
      'apiResponse.error.validation.accountTransfer.idCurrency.invalidType',
    accountTransfer_idCurrency_min:
      'apiResponse.error.validation.accountTransfer.idCurrency.min',
    accountTransfer_amountToTransfer_required:
      'apiResponse.error.validation.accountTransfer.amountToTransfer.required',
    accountTransfer_amountToTransfer_invalidType:
      'apiResponse.error.validation.accountTransfer.amountToTransfer.invalidType',
    accountTransfer_amountToTransfer_maxDecimalPlaces:
      'apiResponse.error.validation.accountTransfer.amountToTransfer.maxDecimalPlaces',
    accountTransfer_amountToTransfer_min:
      'apiResponse.error.validation.accountTransfer.amountToTransfer.min',
    accountTransfer_exchangeRateApplied_invalidType:
      'apiResponse.error.validation.accountTransfer.exchangeRateApplied.invalidType',
    accountTransfer_exchangeRateApplied_maxDecimalPlaces:
      'apiResponse.error.validation.accountTransfer.exchangeRateApplied.maxDecimalPlaces',
    accountTransfer_exchangeRateApplied_min:
      'apiResponse.error.validation.accountTransfer.exchangeRateApplied.min',
    accountTransfer_amountOnUsd_invalidType:
      'apiResponse.error.validation.accountTransfer.amountOnUsd.invalidType',
    accountTransfer_amountOnUsd_maxDecimalPlaces:
      'apiResponse.error.validation.accountTransfer.amountOnUsd.maxDecimalPlaces',
    accountTransfer_amountOnUsd_min:
      'apiResponse.error.validation.accountTransfer.amountOnUsd.min',
    accountTransfer_description_invalidType:
      'apiResponse.error.validation.accountTransfer.description.invalidType',
    accountTransfer_description_maxLength:
      'apiResponse.error.validation.accountTransfer.description.maxLength',
    // Goal DTO
    goal_name_required: 'apiResponse.error.validation.goal.name.nameRequired',
    goal_name_invalidType: 'apiResponse.error.validation.goal.name.nameInvalid',
    goal_description_invalidType:
      'apiResponse.error.validation.goal.description.descriptionInvalid',
    goal_idCurrency_invalidType:
      'apiResponse.error.validation.goal.currency.idCurrencyInvalid',
    goal_idCurrency_min:
      'apiResponse.error.validation.goal.currency.idCurrencyMin',
    goal_amountToReach_invalidType:
      'apiResponse.error.validation.goal.amount.amountToReachInvalid',
    goal_amountToReach_maxDecimalPlaces:
      'apiResponse.error.validation.goal.amount.amountToReachMaxDecimalPlaces',
    goal_amountReached_invalidType:
      'apiResponse.error.validation.goal.amount.amountReachedInvalid',
    goal_amountReached_maxDecimalPlaces:
      'apiResponse.error.validation.goal.amount.amountReachedMaxDecimalPlaces',
    goal_endDateEstimated_required:
      'apiResponse.error.validation.goal.endDate.endDateEstimatedRequired',
    goal_endDateEstimated_invalid:
      'apiResponse.error.validation.goal.endDate.endDateEstimatedInvalid',
    goal_isEnded_invalidType:
      'apiResponse.error.validation.goal.state.isEndedInvalid',
    // Goal Template DTO
    goalTemplate_idGoalTemplate_required:
      'apiResponse.error.validation.goalTemplate.template.idGoalTemplateRequired',
    goalTemplate_idGoalTemplate_invalidType:
      'apiResponse.error.validation.goalTemplate.template.idGoalTemplateInvalid',
    goalTemplate_idGoalTemplate_min:
      'apiResponse.error.validation.goalTemplate.template.idGoalTemplateMin',
    goalTemplate_name_required:
      'apiResponse.error.validation.goalTemplate.name.nameRequired',
    goalTemplate_name_invalidType:
      'apiResponse.error.validation.goalTemplate.name.nameInvalid',
    goalTemplate_description_invalidType:
      'apiResponse.error.validation.goalTemplate.description.descriptionInvalid',
    goalTemplate_idCurrency_invalidType:
      'apiResponse.error.validation.goalTemplate.currency.idCurrencyInvalid',
    goalTemplate_idCurrency_min:
      'apiResponse.error.validation.goalTemplate.currency.idCurrencyMin',
    goalTemplate_amountToReach_invalidType:
      'apiResponse.error.validation.goalTemplate.amount.amountToReachInvalid',
    goalTemplate_amountToReach_maxDecimalPlaces:
      'apiResponse.error.validation.goalTemplate.amount.amountToReachMaxDecimalPlaces',
    goalTemplate_amountReached_invalidType:
      'apiResponse.error.validation.goalTemplate.amount.amountReachedInvalid',
    goalTemplate_amountReached_maxDecimalPlaces:
      'apiResponse.error.validation.goalTemplate.amount.amountReachedMaxDecimalPlaces',
    goalTemplate_isEnded_invalidType:
      'apiResponse.error.validation.goalTemplate.state.isEndedInvalid',
    goalTemplate_daysToReach_invalidType:
      'apiResponse.error.validation.goalTemplate.time.daysToReachInvalid',
    goalTemplate_daysToReach_min:
      'apiResponse.error.validation.goalTemplate.time.daysToReachMin',
    goalTemplate_goalTemplates_invalidType:
      'apiResponse.error.validation.goalTemplate.list.goalTemplatesInvalid',
    goalTemplate_goalTemplates_empty:
      'apiResponse.error.validation.goalTemplate.list.goalTemplatesEmpty',
  },
} as const;

export type MainErrorDomains = typeof MAIN_ERRORS;
export type MainErrorDomainKey = keyof typeof MAIN_ERRORS;
export type MainErrorKey<D extends MainErrorDomainKey> =
  keyof (typeof MAIN_ERRORS)[D];

export function getMainError<
  D extends MainErrorDomainKey,
  K extends keyof (typeof MAIN_ERRORS)[D],
>(domain: D, key: K): (typeof MAIN_ERRORS)[D][K] {
  return MAIN_ERRORS[domain][key];
}
