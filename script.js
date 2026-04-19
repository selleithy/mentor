// Replace this with your Apps Script web app URL after deploying
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3VkzVFAlzrYEaGXLuZvyhO-2R9fAjE1n2h7A_KTSu8LVATO-b0w1wvwdDOniHdhgcXA/exec';

const MENTOR = {
    role: 'mentor',
    title: 'Become a Mentor',
    subtitle: 'Share your knowledge and make an impact',
    labelExpertise: 'Your Expertise',
    placeholderExpertise: 'e.g., Product Design, Leadership',
    labelMessage: 'Why do you want to mentor?',
    placeholderMessage: 'Tell us about your motivation...',
    submitClass: 'btn-indigo',
    successIconClass: 'icon-indigo-bg',
    successIconEmoji: '🏆',
};

const MENTEE = {
    role: 'mentee',
    title: 'Find Your Mentor',
    subtitle: 'Start your journey with expert guidance',
    labelExpertise: 'Areas of Interest',
    placeholderExpertise: 'e.g., Career transition, Startup advice',
    labelMessage: 'What are your goals?',
    placeholderMessage: 'Share what you hope to achieve...',
    submitClass: 'btn-emerald',
    successIconClass: 'icon-emerald-bg',
    successIconEmoji: '💚',
};

const viewHome = document.getElementById('viewHome');
const viewForm = document.getElementById('viewForm');
const formPanel = document.getElementById('formPanel');
const successPanel = document.getElementById('successPanel');
const form = document.getElementById('registrationForm');

function showForm(config) {
    document.getElementById('formTitle').textContent = config.title;
    document.getElementById('formSubtitle').textContent = config.subtitle;
    document.getElementById('fieldRole').value = config.role;
    document.getElementById('labelExpertise').textContent = config.labelExpertise;
    document.getElementById('fieldExpertise').placeholder = config.placeholderExpertise;
    document.getElementById('labelMessage').textContent = config.labelMessage;
    document.getElementById('fieldMessage').placeholder = config.placeholderMessage;

    const btn = document.getElementById('submitBtn');
    btn.className = 'submit-btn ' + config.submitClass;

    form.dataset.successIconClass = config.successIconClass;
    form.dataset.successIconEmoji = config.successIconEmoji;

    formPanel.style.display = 'block';
    successPanel.style.display = 'none';
    form.reset();

    viewHome.style.display = 'none';
    viewForm.style.display = 'flex';
}

document.getElementById('btnMentor').addEventListener('click', () => showForm(MENTOR));
document.getElementById('btnMentee').addEventListener('click', () => showForm(MENTEE));

document.getElementById('btnBack').addEventListener('click', () => {
    viewForm.style.display = 'none';
    viewHome.style.display = 'flex';
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        role: form.elements['role'].value,
        name: form.elements['name'].value,
        email: form.elements['email'].value,
        expertise: form.elements['expertise'].value,
        message: form.elements['message'].value,
    };

    if (APPS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_URL') {
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.error('Submission error', err);
        }
    } else {
        console.log('Submission (Apps Script not configured):', data);
    }

    // Show success
    const icon = document.getElementById('successIcon');
    icon.className = 'success-icon ' + form.dataset.successIconClass;
    icon.textContent = form.dataset.successIconEmoji;

    formPanel.style.display = 'none';
    successPanel.style.display = 'block';

    setTimeout(() => {
        viewForm.style.display = 'none';
        viewHome.style.display = 'flex';
    }, 3000);
});
