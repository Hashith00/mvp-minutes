"use client";
import { useState } from "react";
import {
  Share2,
  LayoutGrid,
  Settings,
  MoveRight,
  Quote,
  Hammer,
  Rocket,
  Briefcase,
  Github,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/common/footer";
import NavBar from "@/components/common/nav-bar";

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Calculate prices based on billing period
  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnual) {
      // Apply 20% discount for annual billing
      return ((monthlyPrice * 12 * 0.8) / 12).toFixed(0);
    }
    return monthlyPrice;
  };

  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Effortless task
              <br className="hidden sm:block" />
              management,{" "}
              <span className="text-orange-500 block sm:inline">anytime</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Manage tasks and projects easily with an all-in-one platform
              designed for seamless collaboration
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10 px-4 sm:px-0">
              <Link
                href="https://github.com/Hashith00/mvp-minutes"
                className="flex items-center rounded-full px-6 sm:px-8 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition text-sm sm:text-base"
              >
                <Github className="w-4 h-4 mr-2" />
                Get MVP in minutes
              </Link>
              <Link
                href="https://calendly.com/mailtohashith/30min"
                className="flex items-center rounded-full px-6 sm:px-8 py-3 bg-white text-gray-900 border border-gray-300 hover:border-gray-400 transition text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Call
              </Link>
            </div>

            {/* Added Dashboard Image */}
            <div className="mt-10 sm:mt-16 relative px-4 sm:px-0">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none h-8 bottom-0" />
              <img
                src="/hero-image.png"
                alt="Task Management Dashboard"
                className="rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl border border-gray-200 w-full"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary-600 mb-2">Benefits</p>
            <h2 className="text-4xl font-bold mb-4">
              The smart choice for your team
            </h2>
            <p className="text-gray-600">
              Everything you need to simplify your projects, boost productivity,
              and keep your team aligned
            </p>
          </div>

          {/* Trusted By Logos */}
          <div className="mb-20">
            <p className="text-center text-gray-600 mb-8">We are trusted by</p>
            <div className="flex justify-center items-center gap-12 flex-wrap">
              <Image
                src="/companies/google_logo.jpeg"
                alt="Mailchimp"
                width={120}
                height={40}
              />
              <Image
                src="/companies/google_logo.jpeg"
                alt="DoorDash"
                width={120}
                height={40}
              />
              <Image
                src="/companies/google_logo.jpeg"
                alt="Google"
                width={120}
                height={40}
              />
              <Image
                src="/companies/google_logo.jpeg"
                alt="Spotify"
                width={120}
                height={40}
              />
              <Image
                src="/companies/google_logo.jpeg"
                alt="Webflow"
                width={120}
                height={40}
              />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <Share2 className="w-6 h-6" color="blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Seamless Collaboration
              </h3>
              <p className="text-gray-600 mb-4">
                Empower your team to collaborate in real-time with easy task
                management and transparent project tracking.
              </p>
              <a
                href="#"
                className="text-primary-600 font-medium flex items-center"
              >
                Learn More
                <MoveRight className="w-4 h-4 ml-2" color="gray" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <LayoutGrid className="w-6 h-6" color="pink" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                All-in-One Solution
              </h3>
              <p className="text-gray-600 mb-4">
                Manage everything from tasks to team communication in one
                intuitive platform designed to boost productivity.
              </p>
              <a
                href="#"
                className="text-primary-600 font-medium flex items-center"
              >
                Learn More
                <MoveRight className="w-4 h-4 ml-2" color="gray" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-primary-600 mb-4">
                <Settings className="w-6 h-6" color="yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Customizable Workflow
              </h3>
              <p className="text-gray-600 mb-4">
                Manage everything from tasks to team communication in one
                intuitive platform designed to boost productivity.
              </p>
              <a
                href="#"
                className="text-primary-600 font-medium flex items-center"
              >
                Learn More
                <MoveRight className="w-4 h-4 ml-2" color="gray" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary-600 mb-2">Advantages</p>
            <h2 className="text-4xl font-bold mb-4">
              Key features to boost your productivity
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore the essential tools designed to streamline your workflow,
              enhance team collaboration, and ensure your projects run smoothly
              from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* To-do List */}
            <div className="relative bg-[#FFF9F0] rounded-xl p-8">
              <span className="inline-block text-lg font-semibold mb-4">
                01
              </span>
              <h3 className="text-xl font-semibold mb-3">To-do List</h3>
              <p className="text-gray-600 mb-6">
                Organize your daily tasks effortlessly with our intuitive to-do
                list. Stay focused and prioritize what matters most
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 flex items-center">
                  <span className="bg-amber-500 p-1 rounded mr-3">✓</span>
                  <span className="line-through text-gray-400">
                    Mascot Illustration
                  </span>
                </div>
                <div className="bg-white rounded-lg p-4">Mobile Prototype</div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span>UI Design Kits</span>
                    <span className="text-green-500">✦</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Develop and assemble a comprehensive UI design kit,
                    including components, templat...
                  </p>
                </div>
              </div>
            </div>

            {/* Team Member Tracking */}
            <div className="relative bg-[#F0F9F0] rounded-xl p-8">
              <span className="inline-block text-lg font-semibold mb-4">
                02
              </span>
              <h3 className="text-xl font-semibold mb-3">
                Team Member Tracking
              </h3>
              <p className="text-gray-600 mb-6">
                Easily track your team members' progress and stay connected.
                Ensure everyone is aligned and working towards shared goals
              </p>
              <div className="bg-white rounded-lg p-4">
                <div className="mb-4">
                  <h4 className="font-medium">Team Members</h4>
                  <p className="text-sm text-gray-500">Collaborative Space</p>
                </div>
                <div className="flex items-center border rounded-full px-4 py-2 mb-4">
                  <svg
                    className="w-4 h-4 text-gray-400 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none w-full"
                  />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg p-3">
                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                    EP
                  </div>
                  <div>
                    <p className="font-medium">Eleanor Pena</p>
                    <p className="text-sm text-gray-500">pena@icloud.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Tracking */}
            <div className="relative bg-[#F0F0F9] rounded-xl p-8">
              <span className="inline-block text-lg font-semibold mb-4">
                03
              </span>
              <h3 className="text-xl font-semibold mb-3">Project Tracking</h3>
              <p className="text-gray-600 mb-6">
                Monitor project timelines and milestones in real-time. Keep
                projects on track and meet your deadlines with confidence
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-yellow-100 rounded"></span>
                    <span className="font-medium">Client Feedback Review</span>
                  </div>
                  <p className="text-sm text-gray-500">Details →</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">SprintMaster Dashboard</span>
                    <span className="text-sm text-gray-500">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      UI Design Task
                    </span>
                    <span className="font-medium">$120,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary-600 mb-2">Testimonials</p>
            <h2 className="text-4xl font-bold mb-4">What our users say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how YowManage has transformed the way teams work. Hear
              directly from users who've improved their productivity and project
              management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg">
              <Quote className="text-4xl mb-6" color="orange" />
              <p className="text-gray-600 mb-8">
                YowManage has completely changed how our team collaborates. It's
                intuitive and has made tracking projects so much easier
              </p>
              <div>
                <p className="font-semibold mb-1">Sarah Thompson</p>
                <p className="text-gray-600 text-sm mb-4">Product Manager</p>
                <Image
                  src="/spotify-logo.svg"
                  alt="Spotify"
                  width={100}
                  height={30}
                />
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg">
              <Quote className="text-4xl mb-6" color="orange" />
              <p className="text-gray-600 mb-8">
                With YowManage, we've streamlined our workflow and met deadlines
                more consistently. The team chat feature is a game-changer
              </p>
              <div>
                <p className="font-semibold mb-1">Alex Rivera</p>
                <p className="text-gray-600 text-sm mb-4">Marketing Lead</p>
                <Image
                  src="/docusign-logo.svg"
                  alt="DocuSign"
                  width={100}
                  height={30}
                />
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg">
              <Quote className="text-4xl mb-6" color="orange" />
              <p className="text-gray-600 mb-8">
                YowManage has helped us keep all our tasks in order. The
                interface is clean, and it makes managing multiple projects a
                breeze
              </p>
              <div>
                <p className="font-semibold mb-1">David Lee</p>
                <p className="text-gray-600 text-sm mb-4">
                  Operations Director
                </p>
                <Image
                  src="/codecademy-logo.svg"
                  alt="Codecademy"
                  width={100}
                  height={30}
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-[#C84E89] text-white rounded-xl p-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div>
                <p className="text-4xl font-bold mb-4">5,000+</p>
                <p className="text-sm opacity-90">
                  Projects managed with YowManage, streamlining team workflows
                  and achieving goals
                </p>
              </div>

              {/* Stat 2 */}
              <div>
                <p className="text-4xl font-bold mb-4">300+</p>
                <p className="text-sm opacity-90">
                  Teams collaborating daily on YowManage, improving
                  communication and efficiency across various projects
                </p>
              </div>

              {/* Stat 3 */}
              <div>
                <p className="text-4xl font-bold mb-4">50,000+</p>
                <p className="text-sm opacity-90">
                  Tasks completed with YowManage, helping teams stay on schedule
                  and meet deadlines
                </p>
              </div>

              {/* Stat 4 */}
              <div>
                <p className="text-4xl font-bold mb-4">95%</p>
                <p className="text-sm opacity-90">
                  User satisfaction with YowManage, reflecting improved project
                  efficiency and teamwork
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary-600 mb-2">Pricing</p>
            <h2 className="text-4xl font-bold mb-4">
              Flexible plans for every team
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your team's needs. Whether you're
              just getting started or managing large projects, YowManage offers
              affordable solutions to help you stay organized and productive
            </p>
          </div>

          {/* Updated Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-gray-600 ${!isAnnual ? "font-medium" : ""}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-16 h-8 bg-gray-200 rounded-full p-1 relative transition-colors duration-200 ease-in-out"
              aria-label="Toggle billing period"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all duration-200 ease-in-out shadow-sm
                  ${isAnnual ? "left-9" : "left-1"}`}
              />
            </button>
            <span className={`text-gray-600 ${isAnnual ? "font-medium" : ""}`}>
              Annually <span className="text-primary-600">20% off</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="border rounded-lg p-8">
              <div className="mb-8">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Hammer className="w-5 h-5" color="pink" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Starter Plan</h3>
                <p className="text-gray-600">
                  Perfect for individuals or small teams getting started with
                  task management
                </p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">FREE</div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Task Management Tools</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Team Collaboration (up to 3 members)</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Basic Project Tracking</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Limited File Storage</span>
                </li>
              </ul>

              <button
                className="w-full py-3 px-6 bg-gray-100 text-gray-800 rounded-lg font-medium"
                onClick={() => {
                  window.open("/pricing", "_blank");
                }}
              >
                Get Started
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border rounded-lg p-8 bg-white shadow-lg relative">
              <div className="mb-8">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-5 h-5" color="blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
                <p className="text-gray-600">
                  Designed for growing teams that need advanced features and
                  flexibility
                </p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">
                  ${calculatePrice(19)}
                  <span className="text-lg text-gray-600 font-normal">
                    /{isAnnual ? "mo" : "month"}
                  </span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-primary-600">
                    Billed annually (${(19 * 12 * 0.8).toFixed(0)}/year)
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Everything in Starter Plan</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Unlimited Team Members</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Advanced Project Tracking</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Customizable Dashboards</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium">
                Upgrade Now
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg p-8">
              <div className="mb-8">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" color="orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enterprise Plan</h3>
                <p className="text-gray-600">
                  Best for large teams and enterprises with multiple projects
                  and complex workflows
                </p>
              </div>

              <div className="mb-8">
                <div className="text-4xl font-bold mb-2">
                  ${calculatePrice(49)}
                  <span className="text-lg text-gray-600 font-normal">
                    /{isAnnual ? "mo" : "month"}
                  </span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-primary-600">
                    Billed annually (${(49 * 12 * 0.8).toFixed(0)}/year)
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Everything in Pro Plan</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Dedicated Account Manager</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Advanced Analytics & Reporting</span>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2" /* Add your checkmark SVG */
                  />
                  <span>Unlimited File Storage</span>
                </li>
              </ul>

              <button className="w-full py-3 px-6 bg-gray-100 text-gray-800 rounded-lg font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
